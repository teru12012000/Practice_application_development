import { Router,Request,Response } from "express";
import { pool } from "../db/db";

export const router=Router();

router.get("/allusers",(req:Request,res:Response)=>{
  pool.query("SELECT * FROM users",(error,reslt)=>{
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

router.post("/add",(req:Request,res:Response)=>{
  const name:string=req.body.name;
  const mail:string=req.body.mail;
  const birth:string=req.body.birth;
  pool.query("SELECT s FROM users s WHERE s.mail=$1",[mail],(error,result)=>{
    if(error){
      return res.json({
        message:"SQLにエラーがあります。",
      })
    }else if(result.rows.length){
      return res.json({
        message:"そのユーザは既に存在しています。"
      })
    }
    pool.query("INSERT INTO users(name, mail, birth) values ($1, $2, $3)",[
      name,
      mail,
      birth,
    ],(error,result)=>{
      const tablename:string=name+birth;
      if(error){
        return res.json({
          message:"SQL(INSERT)に問題があります"
        })
      }else{
        pool.query(`CREATE TABLE ${tablename}(name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, detail VARCHAR(2000) NOT NULL)`,(error,result)=>{
          if(error){
            res.json({
              message:"SQLテーブル作成時エラー",
            })
          }else{
            res.json({
              message:"OK",
            })
          }
        })
      }
    })
  })
});
