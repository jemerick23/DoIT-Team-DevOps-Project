import { resetPassword } from "./DoIT_authAPI.js";

console.log(document.getElementById("changePasswordBtn"));

document
  .getElementById("changePasswordBtn")
  .addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!email || !newPassword || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const result = await resetPassword(email, newPassword);

        alert(result.message);

        if (result.success) {
            window.location.href = "DoIT_Login_Screen.html";
        }

    } catch (err) {
        alert("Failed to reset password.");
        console.error(err);
    }
});