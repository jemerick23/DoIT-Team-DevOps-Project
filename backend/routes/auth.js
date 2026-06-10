const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        role_id
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        // 1. Check if user already exists
        const checkUserSql =
            "SELECT * FROM users WHERE email = ?";

        db.query(checkUserSql, [email], async (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            // 2. Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // 3. Insert user
            const insertSql = `
                INSERT INTO users 
                (first_name, last_name, email, password_hash, role_id)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [
                    first_name,
                    last_name,
                    email,
                    hashedPassword,
                    role_id || null
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    return res.json({
                        success: true,
                        message: "User created successfully",
                        user_id: result.insertId
                    });
                }
            );
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error
        });
    }
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
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Don't send password back
        delete user.password_hash;

        return res.json({
            success: true,
            message: "Login successful",
            user
        });
    });
});

module.exports = router;