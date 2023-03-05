import { Router, Request, Response } from "express";
import { pool } from "../db/db";

export const post_router=Router();

post_router.post("/publicpost",(req:Request,res:Response)=>{
  const {name,title,detail}=req.body;
  pool.query("INSERT INTO public(name, title, detail) values ($1, $2, $3)",[name,title,detail],(error,result)=>{
    if(error){
      return res.json({
        message:"sql文(挿入)にエラーがあります",
      })
    }else{
      return res.json({
        message:"OK",
      })
    }
  })
});

post_router.get("/public",(req:Request,res:Response)=>{
  pool.query("SELECT * FROM public",(error,result)=>{
    if(error){
      return res.json({
        message:"SQLに問題があります。",
        list:undefined,
      })
    }else if(!result.rows.length){
      return res.json({
        messaga:"投稿がありません",
        list:undefined,
      })
    }else{
      return res.json({
        message:"OK",
        list:result.rows,
      })
    }
  })
})


post_router.post("/privatepost",(req:Request,res:Response)=>{
  const email:string=req.body;
  const name:string=req.body.name;
  const birth:string=req.body.birth;
  const title:string=req.body.title;
  const detail:string=req.body.detail;

  pool.query("SELECT s FROM users s WHERE s.email = $1",[email],(err,result)=>{
    if(err){
      return res.json({
        message:"SQLに問題があります",
      })
    }else if(!result.rows.length){
      message:"そのユーザーは存在しません。"
    }else{
      const table:string=name+birth;
      pool.query(`INSERT INTO ${table}(name, title, body) values ($1, $2, $3)`,[name,title,detail],(err,result)=>{
        if(err){
          return res.json({
            message:"SQLに問題があります"
          })
        }else{
          return res.json({
            message:"OK",
          })
        }
      })
    }
  })

  

})