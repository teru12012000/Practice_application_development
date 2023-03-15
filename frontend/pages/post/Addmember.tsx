import Back from "@/components/Back/Back";
import Contain from "@/components/contain/Contain";
import Header from "@/components/Header/Header";
import InputForm from "@/components/InputForm/InputForm";
import { postmenu, Props2 } from "@/data/postdata";
import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Addmember:NextPage = () => {
  const router=useRouter();
  const [name,setName]=useState<string|undefined>("");
  const [mail,setMail]=useState<string|undefined>("");
  const [birth,setBirth]=useState<string|undefined>("");
  const [password,setPassword]=useState<string|undefined>("");
  const postlist:postmenu[]=[
    {
      title:"名前",
      example:"Tanaka",
      info:name,
      setInfo:setName,
    },{
      title:"メールアドレス",
      example:"yyyyyyy@example.com",
      info:mail,
      setInfo:setMail,
    },{
      title:"誕生日",
      example:"20001201,必ず8文字で",
      info:birth,
      setInfo:setBirth,
    },{
      title:"パスワード",
      example:"@abcd123,5文字以上で！",
      info:password,
      setInfo:setPassword,
    }

  ];
  const handleClick=async()=>{
    const res=await fetch("http://localhost:5050/member/add",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "name":name,
        "mail":mail,
        "birth":birth,
        "password":password,
      })
    });
    
    const data:Props2=await res.json() as Props2;
    if(data.message==="OK"){
      setName("");
      setMail("");
      setBirth("");
      setPassword("");
      router.push("/Success/Success")
    }else{
      alert(`エラーメッセージ：${data.message}`);
    }
  }
  return (
    <>
      <Head>
        <title>ユーザー登録</title>
        <meta name="description" content="ユーザーを登録するところです" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Back/>
      <Contain>
        <div>
          <h1 className='animate__animated animate__backInLeft'>メンバー追加</h1>
          <InputForm
            list={postlist}
            btn="追加"
            func={handleClick}
          />
        </div>
      </Contain>
    
    </>
  );
}

export default Addmember;