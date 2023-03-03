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
                message: "sql文にエラーがあります",
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
