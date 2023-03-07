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
  const email:string=req.body.email;
  const name:string=req.body.name;
  const title:string=req.body.title;
  const detail:string=req.body.detail;

  pool.query("SELECT * FROM users  WHERE mail = $1",[email],(err,result)=>{
    if(err){
      return res.json({
        message:"SQLに問題があります",
      })
    }else if(!result.rows.length){
      return res.json({
        message:"そのユーザーは存在しません。"
      })
    }else{
      const dataname:string=result.rows[0].name as string;
      const databirth:string=result.rows[0].birth as string;
      const table:string=dataname+databirth;
      console.log(result.rows);
      pool.query(`INSERT INTO ${table}(name, title, detail) values ($1, $2, $3)`,[name,title,detail],(err,result)=>{
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

post_router.get("/private",(req:Request,res:Response)=>{
  const email:string=req.body.email;
  pool.query("SELECT * FROM users WHERE mail= $1",[email],(err,result)=>{
    if(err){
      return res.json({
        message:"SQL文(SELECT文)に問題があります",
      })
    }else if(!result.rows.length){
      return res.json({
        message:"そのユーザは存在していません",
      })
    }else{
      const table:string=result.rows[0].name+result.rows[0].birth;
      pool.query(`SELECT * FROM ${table}`,(err,result)=>{
        if(err){
          return res.json({
            message:"sql文に問題があります",
          })
        }else if(!result.rows.length){
          return res.json({
            message:"投稿がありません"
          })
        }else{
          return res.json({
            message:"OK",
            list:result.rows,
          })
        }
      })
    }
  })
})