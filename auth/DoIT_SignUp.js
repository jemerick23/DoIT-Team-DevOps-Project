import { signup } from "./DoIT_authAPI.js";

document.getElementById("signupBtn").addEventListener("click", async () => {

    const first_name = document.getElementById("first_name").value.trim();
    const last_name = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;

    console.log("Signup JS loaded");

    if (!first_name || !last_name || !email || !password) {
        alert("Please fill required fields");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const result = await signup({
        first_name,
        last_name,
        email,
        password,
        role
    });

    console.log("SIGNUP RESULT:", result);

    if (result.success) {
        alert("Signup successful!");
        window.location.href = "DoIT_Login_Screen.html";
    } else {
        alert("Signup failed");
    }
});