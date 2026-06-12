const express = require("express");
const router = express.Router();
const db = require("../db");


//GET all roles
router.get("/", (req, res) => {

    const sql = "SELECT * FROM roles";

    db.query(sql, (err, result) => {
        
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

//GET team members with roles
router.get("/members/list", (req, res) => {

    const sql = `
        SELECT
            u.user_id,
            u.first_name,
            u.last_name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r
            ON u.role_id = r.role_id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// GET one role by ID
router.get("/:id", (req, res) => {

    const roleId = parseInt(req.params.id);

    const sql = `SELECT * FROM roles WHERE role_id = ${roleId}`;

    db.query(sql, [roleId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

//CREATE role
router.post("/", (req, res) => {

    const {
        role_name,
        description,
    } = req.body;

    const sql = `
        INSERT INTO roles
        (
            role_name,
            description
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            role_name,
            description
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                success: true,
                role_id: result.insertId,
                message: "Role added successfully"
            });
        }
    );
});

// UPDATE role
router.put("/:id", (req, res) => {

    const roleId = req.params.id;

    const {
        role_name,
        description
    } = req.body;

    const sql = `
        UPDATE roles
        SET
            role_name = ?,
            description = ?
        WHERE role_id = ?
    `;

    db.query(
        sql,
        [
            role_name,
            description,
            roleId
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Role updated successfully"
            });
        }
    );
});

// DELETE role
router.delete("/:id", (req, res) => {

    const roleId = req.params.id;

    const sql = "DELETE FROM roles WHERE role_id = ?";

    db.query(sql, [roleId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        res.json({
            success: true,
            message: "Role deleted successfully"
        });
    });
});

module.exports = router;