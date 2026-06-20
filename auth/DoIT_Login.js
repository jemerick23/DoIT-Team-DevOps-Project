import { login } from "./DoIT_authAPI.js";

//Event listener for login button
document.getElementById("loginBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "";

    //Ensures that both email and password are entered
    if(!email || !password) {
        message.textContent =
            "Please enter your email and password.";
        return;
    }
    //Case that tries entered credentials
    try {
        const result = await login({ email, password });

        if (result.success) {

        localStorage.setItem("user", JSON.stringify(result.user));
        
        //Message displayed after successful login
        message.textContent = "Login successful!";

        setTimeout(() => {window.location.href = "../dashboard/DoIT_Dashboard.html";}, 800);

    //Displays incorrect credentials message
    } else {

        message.textContent =
            "Incorrect email or password.";

    }
    //Display login error message
    } catch (err) {
        console.error(err);
        message.textContent =
        "Server error. Please try again later.";
    }
});