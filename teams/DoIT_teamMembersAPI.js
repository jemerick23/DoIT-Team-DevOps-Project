export async function fetchTeamMembers() { //Gets team members from database

  try {
        const response = await fetch(
            "http://localhost:3000/api/teamMembers/members/list"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch team members");
        }

        return await response.json();

    } catch (error) {
        console.error("Error fetching team members:", error);
        return [];
    }
}