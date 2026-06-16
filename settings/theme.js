console.log("theme.js loaded");
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
}

// Auto-run on EVERY page load
window.addEventListener("load", async () => {
    console.log("Loading theme...");
    const userId = 1;

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