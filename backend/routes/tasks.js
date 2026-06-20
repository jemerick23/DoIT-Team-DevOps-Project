const express = require("express");
const router = express.Router();
const db = require("../db");


//GET all tasks
router.get("/", (req, res) => {

    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, result) => {
        
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// GET one task by ID
router.get("/:id", (req, res) => {

    const taskId = parseInt(req.params.id);

    const sql = `SELECT * FROM tasks WHERE task_id = ${taskId}`;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

//POST create task
router.post("/", (req, res) => {

    const {
        project_id,
        sprint_id,
        assigned_to,
        title,
        description,
        priority,
        status,
        story_points,
        due_date
    } = req.body;

    const sql = `
        INSERT INTO tasks
        (
            project_id,
            sprint_id,
            assigned_to,
            title,
            description,
            priority,
            status,
            story_points,
            due_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            project_id,
            sprint_id,
            assigned_to,
            title,
            description,
            priority,
            status,
            story_points,
            due_date
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                success: true,
                task_id: result.insertId,
                message: "Task created successfully"
            });
        }
    );
});

// UPDATE task
router.put("/:id", (req, res) => {

    const taskId = req.params.id;

    const {
        title,
        description,
        priority,
        status,
        story_points,
        due_date
    } = req.body;

    const sql = `
        UPDATE tasks
        SET
            title = ?,
            description = ?,
            priority = ?,
            status = ?,
            story_points = ?,
            due_date = ?
        WHERE task_id = ?
    `;

    db.query(
        sql,
        [
            title,
            description,
            priority,
            status,
            story_points,
            due_date,
            taskId
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Task updated successfully"
            });
        }
    );
});

// DELETE task
router.delete("/:id", (req, res) => {

    const taskId = req.params.id;

    const sql = "DELETE FROM tasks WHERE task_id = ?";

    db.query(sql, [taskId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully"
        });
    });
});

module.exports = router;