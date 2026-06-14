import { login } from "./DoIT_authAPI.js";

document.getElementById("loginBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const result = await login({ email, password });

        console.log("LOGIN RESULT:", result);

        if (result.success) {

        alert("Login successful!");

        window.location.href = "../dashboard/DoIT_Dashboard.html";

    } else {

        alert(result.message || "Login failed");

    }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});