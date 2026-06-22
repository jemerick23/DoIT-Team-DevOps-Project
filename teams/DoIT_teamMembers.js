import { fetchTeamMembers }
from "./DoIT_teamMembersAPI.js";

let teamMembers = [];
//Initializes team members
export async function initializeteamMembers() {

    console.log("INIT TEAM MEMBERS RAN");

    teamMembers = await fetchTeamMembers();

    console.log("DATA:", teamMembers);

    renderTeamMembers();
}

//Display roles

function renderTeamMembers() {

    const container = document.getElementById("teamMembersList");

    if (!container) return;

    container.innerHTML = "";

    teamMembers.forEach(member => {

        container.innerHTML += `
            <div class="member-card">
                <h4>${member.first_name} ${member.last_name}</h4>
                <p>${member.role_name}</p>
                <p>${member.email}</p>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeteamMembers();
});
