const BASE_URL = "http://localhost:3000/api/auth";

// SIGNUP
export async function signup(user) {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    if (!res.ok) {
        throw new Error("Signup failed");
    }

    return res.json();
}

// LOGIN
export async function login(credentials) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Login failed");
    }

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}

// PROFILE
export async function getProfile() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return res.json();
}