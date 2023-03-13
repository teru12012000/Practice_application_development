"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
const validation_result_1 = require("express-validator/src/validation-result");
const db_1 = require("../db/db");
exports.router = (0, express_1.Router)();
//search
exports.router.get("/search/:word", (req, res) => {
    const { word } = req.params;
    db_1.pool.query("SELECT * FROM users WHERE name LIKE $1 OR mail LIKE $1 OR birth LIKE $1", [`%${word}%`], (err, result) => {
        if (err) {
            return res.json({
                message: "SQLにエラーがあります",
                list: undefined,
            });
        }
        else if (!result.rows.length) {
            return res.json({
                message: "ユーザーが存在しません",
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
//alluser
exports.router.get("/allusers", (req, res) => {
    db_1.pool.query("SELECT * FROM users ORDER BY id ASC;", (error, reslt) => {
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
//post user
exports.router.post("/add", (0, validation_chain_builders_1.body)("name").notEmpty(), (0, validation_chain_builders_1.body)("mail").isEmail(), (0, validation_chain_builders_1.body)("birth").isLength({ min: 8, max: 8 }), (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const birth = req.body.birth;
    const error = (0, validation_result_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.json({
            message: `入力形式が違うんじゃない？よく確認してね。`
        });
    }
    db_1.pool.query("SELECT s FROM users s WHERE s.mail=$1", [mail], (error, result) => {
        if (error) {
            return res.json({
                message: "SQLにエラーがあります。",
            });
        }
        else if (result.rows.length) {
            return res.status(400).json({
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
                        return res.json({
                            message: "SQLテーブル作成時エラー",
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
});
// change information
exports.router.put("/changeinfo/:id", (0, validation_chain_builders_1.body)("name").notEmpty(), (0, validation_chain_builders_1.body)("mail").isEmail(), (0, validation_chain_builders_1.body)("birth").isLength({ min: 8, max: 8 }), (req, res) => {
    const numid = parseInt(req.params.id, 10);
    console.log(numid);
    const { name, mail, birth } = req.body;
    //ユーザーが存在するかの確認
    db_1.pool.query(`SELECT s FROM users s WHERE s.id = $1`, [numid], (err, resulut) => {
        if (err) {
            return res.json({
                message: "sql(select)にエラーがあります",
            });
        }
        else if (!resulut.rows.length) {
            return res.json({
                message: "そのユーザーは存在していないよ"
            });
        }
    });
    const error = (0, validation_result_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.json({
            message: `入力形式が違うんじゃない？よく確認してね。`
        });
    }
    db_1.pool.query("UPDATE users SET name=$1, mail=$2, birth=$3 WHERE id=$4", [name, mail, birth, numid], (err, result) => {
        if (err) {
            return res.json({
                message: err.message
            });
        }
        else {
            res.json({
                message: "ユーザーを正常に更新しました。"
            });
        }
    });
});
exports.router.get("/:id", (req, res) => {
    const { id } = req.params;
    db_1.pool.query("SELECT * FROM users WHERE id=$1", [id], (err, result) => {
        if (err) {
            return res.json({
                message: "sqlにエラーがあります",
            });
        }
        else if (!result.rows.length) {
            return res.json({
                message: "そのユーザは存在しない"
            });
        }
        else {
            return res.json({
                message: "OK",
                list: result.rows[0],
            });
        }
    });
});
