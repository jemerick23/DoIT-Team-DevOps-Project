const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks.js");
const roleRoutes = require("./routes/teamMembers.js");
const app = express();

app.use(cors());
app.use(express.json());

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teamMembers", require("./routes/teamMembers"));

// Test route (optional)
app.get("/", (req, res) => {
    res.send("DoIT API is running 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});