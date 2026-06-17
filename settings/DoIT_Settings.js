function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

document.getElementById("saveBtn").addEventListener("click", async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "../auth/DoIT_Login_Screen.html";
        return;
    }

    const userId = user.user_id;

    const settings = {
        theme: document.getElementById("theme").value,
        notifications: document.getElementById("notifications").value === "yes",
        first_name: document.getElementById("first_name").value.trim(),
        last_name: document.getElementById("last_name").value.trim(),
        occupation: document.getElementById("role").value.trim(),
        allow_tracking: document.getElementById("allow-tracking").checked,
        data_sharing: document.getElementById("data-sharing").checked
    };

    try {
        const response = await fetch(
            `http://localhost:3000/api/settings/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(settings)
            }
        );

        const result = await response.json();

        user.first_name = settings.first_name;
        user.last_name = settings.last_name;
        user.role = settings.occupation;

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        document.getElementById("message").textContent = result.message;

        applyTheme(settings.theme);

    } catch (err) {
        console.error(err);
        document.getElementById("message").textContent =
            "Failed to save settings";
    }
});

window.addEventListener("load", async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "../auth/DoIT_Login_Screen.html";
        return;
    }

    const userId = user.user_id;

    try {

        const res = await fetch(
            `http://localhost:3000/api/settings/${userId}`
        );

        if (!res.ok) {
            throw new Error("Failed to load settings");
        }

        const data = await res.json();

        // Theme
        if (data.theme) {
            applyTheme(data.theme);
            document.getElementById("theme").value = data.theme;
        }

        // Profile fields
        document.getElementById("first_name").value =
            data.first_name || "";

        document.getElementById("last_name").value =
            data.last_name || "";

        document.getElementById("role").value =
            data.role || "";

        // Notifications
        document.getElementById("notifications").value =
            data.notifications ? "yes" : "no";

        // Privacy settings
        document.getElementById("allow-tracking").checked =
            !!data.allow_tracking;

        document.getElementById("data-sharing").checked =
            !!data.data_sharing;

    } catch (err) {

        console.error(
            "Settings load failed:",
            err
        );

        document.getElementById("message").textContent =
            "Failed to load settings";
    }
});