function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

document.getElementById("saveBtn").addEventListener("click", async () => {

    const userId = 1;

    const settings = {
        theme: document.getElementById("theme").value,
        notifications: document.getElementById("notifications").value === "yes",
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        occupation: document.getElementById("role").value,
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

        document.getElementById("message").textContent = result.message;

        applyTheme(settings.theme);

    } catch (err) {
        console.error(err);
        document.getElementById("message").textContent =
            "Failed to save settings";
    }
});

window.addEventListener("load", async () => {
    const userId = 1;

    try {
        const res = await fetch(`http://localhost:3000/api/settings/${userId}`);

        if (!res.ok) throw new Error("Failed to load settings");

        const data = await res.json();

        if (data?.theme) {
            applyTheme(data.theme);
            document.getElementById("theme").value = data.theme;
        }

    } catch (err) {
        console.error("Settings load failed:", err);
    }
});
