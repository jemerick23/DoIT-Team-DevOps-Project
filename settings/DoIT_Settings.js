// DoIT_Settings.js
// Simple settings page: profile settings, privacy settings, dark mode
(function(){
  const rootId = 'doit-settings-root';
//Check box
  function createCheckbox(id, labelText, checked){
    const wrapper = document.createElement('label');
    wrapper.className = 'ds-checkbox';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;
    input.checked = !!checked;
    const span = document.createElement('span');
    span.textContent = labelText;
    wrapper.appendChild(input);
    wrapper.appendChild(span);
    return {wrapper, input};
  }
//Text input
  function createTextInput(id, labelText, value=''){
    const container = document.createElement('div');
    container.className = 'ds-field';
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.value = value;
    container.appendChild(label);
    container.appendChild(input);
    return {container, input};
  }
//Apply theme (Light or dark)
  function applyTheme(isDark){
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('doit_settings_dark', isDark ? '1' : '0');
  }
//Save profile settings
  function saveProfile(){
    const name = document.getElementById('ds-name').value;
    const email = document.getElementById('ds-email').value;
    const profile = {name, email};
    localStorage.setItem('doit_profile', JSON.stringify(profile));
  }
//Save privacy settings
  function savePrivacy(){
    const tracking = document.getElementById('ds-tracking').checked;
    const dataShare = document.getElementById('ds-datashare').checked;
    const privacy = {tracking, dataShare};
    localStorage.setItem('doit_privacy', JSON.stringify(privacy));
  }
//Build settings
  function build(){
    if(document.getElementById(rootId)) return;
    const root = document.createElement('div');
    root.id = rootId;
    root.className = 'doit-settings';

    // Profile
    const profileSec = document.createElement('section');
    profileSec.className = 'ds-section';
    const ph = document.createElement('h2'); ph.textContent = 'Profile Settings';
    profileSec.appendChild(ph);
    const storedProfile = JSON.parse(localStorage.getItem('doit_profile')||'{}');
    const nameField = createTextInput('ds-name','Full name', storedProfile.name||'');
    const emailField = createTextInput('ds-email','Email', storedProfile.email||'');
    profileSec.appendChild(nameField.container);
    profileSec.appendChild(emailField.container);
    const saveProfileBtn = document.createElement('button');
    saveProfileBtn.className='ds-btn';
    saveProfileBtn.textContent='Save Profile';
    saveProfileBtn.onclick = function(){ saveProfile(); saveStatus('Profile saved'); };
    profileSec.appendChild(saveProfileBtn);

    // Privacy
    const privSec = document.createElement('section');
    privSec.className='ds-section';
    const ph2 = document.createElement('h2'); ph2.textContent = 'Privacy Settings';
    privSec.appendChild(ph2);
    const storedPrivacy = JSON.parse(localStorage.getItem('doit_privacy')||'{}');
    const cb1 = createCheckbox('ds-tracking','Allow tracking', storedPrivacy.tracking);
    const cb2 = createCheckbox('ds-datashare','Allow data sharing', storedPrivacy.dataShare);
    privSec.appendChild(cb1.wrapper);
    privSec.appendChild(cb2.wrapper);
    const savePrivBtn = document.createElement('button');
    savePrivBtn.className='ds-btn'; savePrivBtn.textContent='Save Privacy';
    savePrivBtn.onclick = function(){ savePrivacy(); saveStatus('Privacy saved'); };
    privSec.appendChild(savePrivBtn);

    // Dark mode
    const themeSec = document.createElement('section');
    themeSec.className='ds-section';
    const th = document.createElement('h2'); th.textContent = 'Appearance';
    themeSec.appendChild(th);
    const darkStored = localStorage.getItem('doit_settings_dark') === '1';
    const darkCb = createCheckbox('ds-dark','Dark mode', darkStored);
    darkCb.input.onchange = function(){ applyTheme(this.checked); };
    themeSec.appendChild(darkCb.wrapper);

    // Status
    const status = document.createElement('div'); status.id='ds-status'; status.style.marginTop='8px';

    root.appendChild(profileSec);
    root.appendChild(privSec);
    root.appendChild(themeSec);
    root.appendChild(status);

    document.body.appendChild(root);
//Save message displayed
    function saveStatus(msg){
      status.textContent = msg;
      setTimeout(()=>{ status.textContent=''; },2000);
    }

    // wire privacy checkboxes
    cb1.input.onchange = cb2.input.onchange = function(){ savePrivacy(); };

    // ensure theme applied
    applyTheme(darkStored);
  }

  // auto-build on DOM ready
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();

  // export for manual use
  window.DoIT_Settings = { build };

})();
