import express from "express";
import cors from "cors";
import { router } from "./router/members";
import { post_router } from "./router/Post";
const app=express();
const PORT=5050;

app.use(cors());
app.use(express.json());
app.use("/member",router);
app.use("/post",post_router);
app.listen(PORT,()=>{
  console.log(`Server is runnning. port number is ${PORT}`);
})