console.log("theme.js loaded");
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
}

// Auto-run on EVERY page load
document.addEventListener("DOMContentLoaded", async () => {
    console.log("Loading theme...");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const userId = user.user_id;

    try {
        const res = await fetch(`http://localhost:3000/api/settings/${userId}`);
        const data = await res.json();

        console.log(data);

        if (data?.theme) {
            applyTheme(data.theme);
        }

    } catch (err) {
        console.error("Theme load failed:", err);
    }
});