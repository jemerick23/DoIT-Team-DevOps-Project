import { login } from "./DoIT_authAPI.js";

document.getElementById("loginBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "";

    if(!email || !password) {
        message.textContent =
            "Please enter your email and password.";
        return;
    }

    try {
        const result = await login({ email, password });

        console.log("LOGIN RESULT:", result);

        if (result.success) {

        localStorage.setItem("user", JSON.stringify(result.user));

        message.textContent = "Login successful!";

        setTimeout(() => {window.location.href = "../dashboard/DoIT_Dashboard.html";}, 800);

    } else {

        message.textContent =
            "Incorrect email or password.";

    }

    } catch (err) {
        console.error(err);
        message.textContent =
        "Server error. Please try again later.";
    }
});