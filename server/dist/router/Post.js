"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_router = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.post_router = (0, express_1.Router)();
exports.post_router.post("/publicpost", (req, res) => {
    const { name, title, detail } = req.body;
    db_1.pool.query("INSERT INTO public(name, title, detail) values ($1, $2, $3)", [name, title, detail], (error, result) => {
        if (error) {
            return res.json({
                message: "sql文(挿入)にエラーがあります",
            });
        }
        else {
            return res.json({
                message: "OK",
            });
        }
    });
});
exports.post_router.get("/public", (req, res) => {
    db_1.pool.query("SELECT * FROM public", (error, result) => {
        if (error) {
            return res.json({
                message: "SQLに問題があります。",
                list: undefined,
            });
        }
        else if (!result.rows.length) {
            return res.json({
                messaga: "投稿がありません",
                list: undefined,
            });
        }
        else {
            return res.json({
                message: "OK",
                list: result.rows,
            });
        }
    });
});
exports.post_router.post("/privatepost", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const title = req.body.title;
    const detail = req.body.detail;
    db_1.pool.query("SELECT * FROM users  WHERE mail = $1", [email], (err, result) => {
        if (err) {
            return res.json({
                message: "SQLに問題があります",
            });
        }
        else if (!result.rows.length) {
            return res.json({
                message: "そのユーザーは存在しません。"
            });
        }
        else {
            const dataname = result.rows[0].name;
            const user_id = result.rows[0].user_id;
            const table = `user_table_${String(user_id)}`;
            console.log(result.rows);
            db_1.pool.query(`INSERT INTO ${table}(name, title, detail) values ($1, $2, $3)`, [name, title, detail], (err, result) => {
                if (err) {
                    return res.json({
                        message: "SQLに問題があります"
                    });
                }
                else {
                    return res.json({
                        message: "OK",
                    });
                }
            });
        }
    });
});
exports.post_router.get("/private", (req, res) => {
    const email = req.body.email;
    db_1.pool.query("SELECT * FROM users WHERE mail= $1", [email], (err, result) => {
        if (err) {
            return res.json({
                message: "SQL文(SELECT文)に問題があります",
            });
        }
        else if (!result.rows.length) {
            return res.json({
                message: "そのユーザは存在していません",
            });
        }
        else {
            const table = result.rows[0].name + result.rows[0].birth;
            db_1.pool.query(`SELECT * FROM ${table}`, (err, result) => {
                if (err) {
                    return res.json({
                        message: "sql文に問題があります",
                    });
                }
                else if (!result.rows.length) {
                    return res.json({
                        message: "投稿がありません"
                    });
                }
                else {
                    return res.json({
                        message: "OK",
                        list: result.rows,
                    });
                }
            });
        }
    });
});
