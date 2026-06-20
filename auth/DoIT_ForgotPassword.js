import { resetPassword } from "./DoIT_authAPI.js";

//Change password event listener
document
  .getElementById("changePasswordBtn")
  .addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    //Checks if all input fields are filled out
    if (!email || !newPassword || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }
    //Checks whether the new password matches with password confirmation
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    //Reset password
    try {
        const result = await resetPassword(email, newPassword);
    //Success message
        alert(result.message);

        if (result.success) {
            window.location.href = "DoIT_Login_Screen.html";
        }
    //Failure message
    } catch (err) {
        alert("Failed to reset password.");
        console.error(err);
    }
});