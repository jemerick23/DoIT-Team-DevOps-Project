const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

console.log("AUTH ROUTES LOADED");

router.post("/signup", (req, res) => {
    const { first_name, last_name, email, password, role_id } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ 
            success: false,
            message: "Missing fields" });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length > 0) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertSql = `
            INSERT INTO users (first_name, last_name, email, password_hash, role_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(insertSql,
            [first_name, last_name, email, hashedPassword, role_id || null],
            (err, result) => {
                if (err) return res.status(500).json(err);

                res.json({
                    success: true,
                    message: "User created successfully",
                    user_id: result.insertId
                });
            }
        );
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = `
        SELECT user_id, first_name, last_name, email, password_hash, role_id
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (!results || results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const user = results[0];

        if (!user.password_hash) {
            console.error("Missing password_hash for user:", user);
            return res.status(500).json({
                message: "User password not set correctly in database"
            });
        }

        console.log("LOGIN RESULTS:", results);
        console.log("USER:", user);
        console.log("PASSWORD HASH:", user.password_hash);

        try {
            const isMatch = await bcrypt.compare(password, user.password_hash);

            console.log("MATCH:", isMatch);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }

            delete user.password_hash;

            return res.json({
                success: true,
                message: "Login successful",
                user
            });

        } catch (error) {
            console.error("BCRYPT ERROR:", error);
            return res.status(500).json({
                message: "Authentication error"
            });
        }
    });
});

router.post("/reset-password", async (req, res) => {

    const { email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "UPDATE users SET password_hash = ? WHERE email = ?";

        db.query(
            sql,
            [hashedPassword, email],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Database error"
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Email not found"
                    });
                }

                res.json({
                    success: true,
                    message: "Password updated successfully"
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
});

module.exports = router;