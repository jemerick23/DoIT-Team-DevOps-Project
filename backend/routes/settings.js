const express = require("express");
const router = express.Router();
const db = require("../db").promise();


// GET user settings
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT * FROM user_settings WHERE user_id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Settings not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// UPDATE user settings
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
        await db.query(
            `
            INSERT INTO user_settings (
                user_id,
                theme,
                notifications,
                first_name,
                last_name,
                occupation,
                allow_tracking,
                data_sharing
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                theme = VALUES(theme),
                notifications = VALUES(notifications),
                first_name = VALUES(first_name),
                last_name = VALUES(last_name),
                occupation = VALUES(occupation),
                allow_tracking = VALUES(allow_tracking),
                data_sharing = VALUES(data_sharing)
            `,
            [
                userId,
                theme,
                notifications,
                first_name,
                last_name,
                occupation,
                allow_tracking,
                data_sharing
            ]
        );

        res.json({ message: "Settings updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;



