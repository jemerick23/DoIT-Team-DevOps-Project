const express = require("express"); 
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/auth.js");
const taskRoutes = require("./routes/tasks.js");
const roleRoutes = require("./routes/teamMembers.js");
const messageRoutes = require("./routes/teamMessages.js");
const settingsRoutes = require("./routes/settings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { authenticateUser, authorizeRoles } = require("../auth/DoIT_authentication.js");


require("dotenv").config()

const app = express();
const upload = multer({ dest: "uploads/" });

app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teamMembers", roleRoutes);
app.use("/api/teamMessages", messageRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/uploads", express.static("uploads"));

// Test route (optional)
app.get("/", (req, res) => {
    res.send("DoIT API is running 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// USERS
app.get("/api/profile", authenticateUser, async (req, res) => {
    const [users] = await db.query(
        "SELECT user_id, full_name, email, role, account_status, created_date, last_login FROM users WHERE user_id = ?",
        [req.user.userId]
    );
    res.json(users[0]);
});
    
app.get("/api/users", authenticateUser, authorizeRoles("admin"), async (req, res) => {
    const [users] = await db.query(
        "SELECT user_id, full_name, email, role, account_status FROM users"
    );
    res.json(users);
});