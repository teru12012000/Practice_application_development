"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.router = (0, express_1.Router)();
exports.router.get("/allusers", (req, res) => {
    db_1.pool.query("SELECT * FROM users", (error, reslt) => {
        if (error) {
            return res.json({
                message: "SQLにエラーがありました",
                list: undefined,
            });
        }
        else if (!reslt.rows.length) {
            return res.json({
                message: "ユーザーが一人もいません",
                list: undefined,
            });
        }
        else {
            return res.json({
                message: "OK",
                list: reslt.rows
            });
        }
    });
});
exports.router.post("/add", (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const birth = req.body.birth;
    db_1.pool.query("SELECT s FROM users s WHERE s.mail=$1", [mail], (error, result) => {
        if (error) {
            return res.json({
                message: "SQLにエラーがあります。",
            });
        }
        else if (result.rows.length) {
            return res.json({
                message: "そのユーザは既に存在しています。"
            });
        }
        db_1.pool.query("INSERT INTO users(name, mail, birth) values ($1, $2, $3)", [
            name,
            mail,
            birth,
        ], (error, result) => {
            const tablename = name + birth;
            if (error) {
                return res.json({
                    message: "SQL(INSERT)に問題があります"
                });
            }
            else {
                db_1.pool.query(`CREATE TABLE ${tablename}(name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, detail VARCHAR(2000) NOT NULL)`, (error, result) => {
                    if (error) {
                        res.json({
                            message: "SQLテーブル作成時エラー",
                        });
                    }
                    else {
                        res.json({
                            message: "OK",
                        });
                    }
                });
            }
        });
    });
});
