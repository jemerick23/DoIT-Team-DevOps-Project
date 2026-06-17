const express = require("express");
const router = express.Router();
const db = require("../db").promise();


// GET user settings + profile
router.get("/:userId", async (req, res) => {

    const { userId } = req.params;

    try {

        const [rows] = await db.query(
            `
            SELECT
                u.first_name,
                u.last_name,
                u.role,
                s.theme,
                s.notifications,
                s.allow_tracking,
                s.data_sharing
            FROM users u
            LEFT JOIN user_settings s
                ON u.user_id = s.user_id
            WHERE u.user_id = ?
            `,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// UPDATE user settings + profile
router.put("/:userId", async (req, res) => {

    const { userId } = req.params;

    const {
        theme,
        notifications,
        first_name,
        last_name,
        occupation,
        allow_tracking,
        data_sharing
    } = req.body;

    try {

        // Update users table
        await db.query(
            `
            UPDATE users
            SET
                first_name = ?,
                last_name = ?,
                role = ?
            WHERE user_id = ?
            `,
            [
                first_name,
                last_name,
                occupation,
                userId
            ]
        );

        // Update settings table
        await db.query(
            `
            INSERT INTO user_settings (
                user_id,
                theme,
                notifications,
                allow_tracking,
                data_sharing
            )
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                theme = VALUES(theme),
                notifications = VALUES(notifications),
                allow_tracking = VALUES(allow_tracking),
                data_sharing = VALUES(data_sharing)
            `,
            [
                userId,
                theme,
                notifications,
                allow_tracking,
                data_sharing
            ]
        );

        res.json({
            success: true,
            message: "Settings updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;



