const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

//Sign up route
router.post("/signup", (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    //Ensures all sign up fields are filled out
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ 
            success: false,
            message: "Missing fields" });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Checks for proper email format
    if (!emailPattern.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    // Retrieve user account by email address
    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {
        if (err) return res.status(500).json(err);

        //Checks if user already exists
        if (results.length > 0) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" });
        }

        //Password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert new user's details into users table
        const insertSql = `
            INSERT INTO users (first_name, last_name, email, password_hash, role)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(insertSql,
            [first_name, last_name, email, hashedPassword, role || null],
            (err, result) => {
                if (err) return res.status(500).json(err);

                //Displays successful account creation message
                res.json({
                    success: true,
                    message: "User created successfully",
                    user_id: result.insertId
                });
            }
        );
    });
});

//Login route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    //Checks if user entered email and password
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = `
        SELECT user_id, first_name, last_name, email, password_hash, role
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Database error" });
        }

        //Checks for correct email and password combination
        if (!results || results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const user = results[0];

        if (!user.password_hash) {
            console.error("User record missing password_hash");
            return res.status(500).json({
                message: "User password not set correctly in database"
            });
        }

        try {
            const isMatch = await bcrypt.compare(password, user.password_hash);

            //Checks if password matches with password_hash
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }

            delete user.password_hash;

            //Displays login successful message
            return res.json({
                success: true,
                message: "Login successful",
                user
            });

            //Displays login error
        } catch (error) {
            console.error("BCRYPT ERROR:", error);
            return res.status(500).json({
                message: "Authentication error"
            });
        }
    });
});

//Reset-password route
router.post("/reset-password", async (req, res) => {

    const { email, password } = req.body;

    try {
        //Password_hash
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
                //Displays email not found message
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Email not found"
                    });
                }
                //Displays success message
                res.json({
                    success: true,
                    message: "Password updated successfully"
                });
            }
        );

    } catch (error) {
        //Displays server error message
        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
});

module.exports = router;