const express = require("express");
const router = express.Router();
const db = require("../db");


//GET all messages
router.get("/", (req, res) => {

    const sql = `
        SELECT
            m.message_id,
            u.first_name,
            u.last_name,
            m.message,
            m.created_at
        FROM messages m
        JOIN users u
            ON m.user_id = u.user_id
        ORDER BY m.created_at DESC
    `;

    db.query(sql, (err, result) => {
        
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// GET one message by ID
router.get("/:id", (req, res) => {

    const messageId = req.params.id;

    const sql = "SELECT * FROM messages WHERE message_id = ?";

    db.query(sql, [messageId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

//CREATE message
router.post("/", (req, res) => {

    const {
        user_id,
        message,
    } = req.body;

    const sql = `
        INSERT INTO messages
        (
            user_id,
            message
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            message
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                success: true,
                message_id: result.insertId,
                message: "Message added successfully"
            });
        }
    );
});

// UPDATE message
router.put("/:id", (req, res) => {

    const message_id = req.params.id;

    const {
        message
    } = req.body;

    const sql = `
        UPDATE messages
        SET
            message = ?
        WHERE message_id = ?
    `;

    db.query(
        sql,
        [
            message,
            message_id
            
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Message updated successfully"
            });
        }
    );
});

// DELETE message
router.delete("/:id", (req, res) => {

    const messageId = req.params.id;

    const sql = "DELETE FROM messages WHERE message_id = ?";

    db.query(sql, [messageId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message deleted successfully"
        });
    });
});

module.exports = router;