import { Router,Request,Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { Result, validationResult } from "express-validator/src/validation-result";
import { pool } from "../db/db";

export const router=Router();
//search
router.get("/search/:word",(req:Request,res:Response)=>{
  const {word}=req.params;
  pool.query("SELECT * FROM users WHERE name LIKE $1 OR mail LIKE $1 OR birth LIKE $1",[`%${word}%`],(err,result)=>{
    if(err){
      return res.json({
        message:"SQLにエラーがあります",
        list:undefined,
      })
    }else if(!result.rows.length){
      return res.json({
        message:"ユーザーが存在しません",
      })
    }else{
      return res.json({
        message:"OK",
        list:result.rows,
      })
    }
  })
})
//alluser
router.get("/allusers",(req:Request,res:Response)=>{
  pool.query("SELECT * FROM users ORDER BY id ASC;",(error,reslt)=>{
    if(error){
      return res.json({
        message:"SQLにエラーがありました",
        list:undefined,
      })
    }else if(!reslt.rows.length){
      return res.json({
        message:"ユーザーが一人もいません",
        list:undefined,

      })
    }else{
      return res.json({
        message:"OK",
        list:reslt.rows
      })
    }
  })
});
//post user
router.post("/add",
  body("name").notEmpty(),
  body("mail").isEmail(),
  body("birth").isLength({min:8,max:8}),
  (req:Request,res:Response)=>{
  const name:string=req.body.name;
  const mail:string=req.body.mail;
  const birth:string=req.body.birth;
  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.json({
      message:`入力形式が違うんじゃない？よく確認してね。`
    })
  }
  //ユーザが存在しているかどうか
  pool.query("SELECT s FROM users s WHERE s.mail=$1",[mail],(error,result)=>{
    if(error){
      return res.json({
        message:"SQLにエラーがあります。",
      })
    }else if(result.rows.length){
      return res.status(400).json({
        message:"そのユーザは既に存在しています。"
      })
    }
  });
  //挿入
  pool.query("INSERT INTO users(name, mail, birth) values ($1, $2, $3)",[
    name,
    mail,
    birth,
  ],(error,result)=>{
    if(error){
      return res.json({
        message:"SQL(INSERT)に問題があります"
      })
    }else{
      //挿入したユーザのidを取得
      pool.query("SELECT * FROM users WHERE mail=$1",[mail],(error,result)=>{
        if(error){
          return res.json({
            message:"id確認sqlエラー",
          })
        }else if(!result.rows.length){
          return res.json({
            message:"ユーザが存在しない",
          })
        }else{
          const tablename:string=`user_table_${String(result.rows[0].id)}`;
          //テーブル作成
          pool.query(
            `CREATE TABLE ${tablename}(name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, detail VARCHAR(2000) NOT NULL, id SERIAL PRIMARY KEY)`,
            (error,result)=>{
            if(error){
              return res.json({
                message:"SQLテーブル作成時エラー",
              })
            }else{
              return res.json({
                message:"OK",
              })
            };
          });
        };
      });
    }
  });

});
// change information
router.put("/changeinfo/:id",
body("name").notEmpty(),
body("mail").isEmail(),
body("birth").isLength({min:8,max:8}),  
(req:Request,res:Response)=>{
  const numid: number = parseInt(req.params.id, 10);
  console.log(numid);
  const {name,mail,birth}=req.body;
  //ユーザーが存在するかの確認
  pool.query(`SELECT s FROM users s WHERE s.id = $1`,[numid],(err,resulut)=>{
    if(err){
      return res.json({
        message:"sql(select)にエラーがあります",
      })
    }else if(!resulut.rows.length){
      return res.json({
        message:"そのユーザーは存在していないよ"
      })
    }
  })
  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.json({
      message:`入力形式が違うんじゃない？よく確認してね。`
    })
  }
  pool.query("UPDATE users SET name=$1, mail=$2, birth=$3 WHERE id=$4",[name,mail,birth,numid],(err,result)=>{
    if(err){
      return res.json({
        message:err.message
      })
    }else{
      res.json({
        message:"ユーザーを正常に更新しました。"
      })
    }
  })
});

router.get("/:id",(req:Request,res:Response)=>{
  const {id}=req.params;
  pool.query("SELECT * FROM users WHERE id=$1",[id],(err,result)=>{
    if(err){
      return res.json({
        message:"sqlにエラーがあります",
      })
    }else if(!result.rows.length){
      return res.json({
        message:"そのユーザは存在しない"
      })      
    }else{
      return res.json({
        message:"OK",
        list:result.rows[0],
      })
    }
  })
})

router.delete("/deletemember/:id",(req:Request,res:Response)=>{
  const {id}=req.params;
  pool.query("SELECT s FROM users s WHERE s.id=$1",[id],(err,result)=>{
    if(err){
      return res.json({
        message:"SQLのエラーです",
      })
    }else if(!result.rows.length){
      return res.json({
        message:"そのユーザーは存在しない",
      })
    }else{
      pool.query("DELETE FROM users WHERE id=$1",[id],(err,result)=>{
        if(err){
          return res.json({
            message:"SQL文(DELETE)のエラーです"
          })
        }
      })
      const tablename:string=`user_table_${String(id)}`
      pool.query(`DROP TABLE ${tablename}`,(err,result)=>{
        if(err){
          return res.json({
            message:"SQL文(DELETE)のエラーです"
          })
        }else{
          return res.json({
            message:"ユーザーを削除しました"
          })
        }
      })
    }
  });
})
