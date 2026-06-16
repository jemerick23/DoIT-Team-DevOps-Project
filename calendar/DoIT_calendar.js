const calendarGrid = document.getElementById('calendarGrid');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const taskPanel = document.getElementById('taskPanel');
const taskDateTitle = document.getElementById('taskDateTitle');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const closeTaskPanel = document.getElementById('closeTaskPanel');

const state = {
    currentDate: new Date(),
    selectedKey: null,
};

const tasks = JSON.parse(localStorage.getItem('doitCalendarTasks') || '{}');

function saveTasks() {
    localStorage.setItem('doitCalendarTasks', JSON.stringify(tasks));
}

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function renderCalendar() {
    calendarGrid.innerHTML = '';
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    monthYear.textContent = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

for (let empty = 0; empty < startWeekDay; empty += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day-cell inactive';
    calendarGrid.appendChild(emptyCell);
    }

for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dateKey = formatDateKey(date);
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    cell.dataset.dateKey = dateKey;
    cell.innerHTML = `
        <div class="day-number">${day}</div>
        <div class="task-count">${tasks[dateKey] ? tasks[dateKey].length + ' task' + (tasks[dateKey].length > 1 ? 's' : '') : 'No tasks'}</div>
    `;
    cell.addEventListener('click', () => openTaskPanel(dateKey));
    calendarGrid.appendChild(cell);
    }
}

function openTaskPanel(dateKey) {
    state.selectedKey = dateKey;
    taskDateTitle.textContent = `Tasks for ${dateKey}`;
    taskInput.value = '';
    renderTaskList();
    taskPanel.classList.add('active');
    taskInput.focus();
}

function renderTaskList() {
    taskList.innerHTML = '';
    const list = tasks[state.selectedKey] || [];
    if (list.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'No tasks yet. Add one below.';
    emptyItem.style.color = '#666';
    taskList.appendChild(emptyItem);
    return;
}
list.forEach((task, index) => {
    const item = document.createElement('li');
    item.textContent = task;
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeTask(index));
    item.appendChild(removeButton);
    taskList.appendChild(item);
    });
}

function addTask() {
    const value = taskInput.value.trim();
    if (!value || !state.selectedKey) return;
    if (!tasks[state.selectedKey]) {
    tasks[state.selectedKey] = [];
    }
    tasks[state.selectedKey].push(value);
    saveTasks();
    renderTaskList();
    renderCalendar();
    taskInput.value = '';
    taskInput.focus();
}

function removeTask(index) {
    if (!state.selectedKey || !tasks[state.selectedKey]) return;
    tasks[state.selectedKey].splice(index, 1);
    if (tasks[state.selectedKey].length === 0) {
        delete tasks[state.selectedKey];
    }
    saveTasks();
    renderTaskList();
    renderCalendar();
}

prevMonth.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    renderCalendar();
});

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
    addTask();
    }
});
closeTaskPanel.addEventListener('click', () => taskPanel.classList.remove('active'));

renderCalendar();