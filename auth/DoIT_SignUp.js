import { signup } from "./DoIT_authAPI.js";

//Sign up button event listener
document.getElementById("signupBtn").addEventListener("click", async () => {

try{    
    const first_name = document.getElementById("first_name").value.trim();
    const last_name = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value.trim();
    const password = document.getElementById("password").value;

    //Ensures the user fills out all required fields
        if (!first_name || !last_name || !email || !password) {
            alert("Please fill required fields");
            return;
        }

    //Email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Checks whether the user entered an email
        if(!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

    //Retrieves user information from database
        const result = await signup({
            first_name,
            last_name,
            email,
            password,
            role
        });

    //After successful signup, the program redirects the user to the login screen
        if (result.success) {
            alert("Signup successful!");
            window.location.href = "DoIT_Login_Screen.html";
            }
            
    //Sign up error message
        } catch (err) {

            console.error("SIGNUP ERROR:", err);
            alert(err.message);
    }
});
