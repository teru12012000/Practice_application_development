import { Router, Request, Response } from "express";
import { pool } from "../db/db";

export const post_router=Router();

post_router.post("/publicpost",(req:Request,res:Response)=>{
  const {name,title,detail}=req.body;
  pool.query("INSERT INTO public(name, title, detail) values ($1, $2, $3)",[name,title,detail],(error,result)=>{
    if(error){
      return res.json({
        message:"sql文にエラーがあります",
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