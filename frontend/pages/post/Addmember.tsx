import Back from "@/components/Back/Back";
import Contain from "@/components/contain/Contain";
import Header from "@/components/Header/Header";
import { postmenu, Props2 } from "@/data/postdata";
import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const Addmember:NextPage = () => {
  const router=useRouter();
  const [name,setName]=useState<string>("");
  const [mail,setMail]=useState<string>("");
  const [birth,setBirth]=useState<string>("");
  const [canpush,setCanpush]=useState<boolean>(true);
  const postlist:postmenu[]=[
    {
      title:"名前",
      example:"Tanaka",
      setInfo:setName,
    },{
      title:"メールアドレス",
      example:"yyyyyyy@example.com",
      setInfo:setMail,
    },{
      title:"誕生日",
      example:"20001201,必ず8文字で",
      setInfo:setBirth,
    }
  ];

  const handleChange=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,setInfo:Dispatch<SetStateAction<string>>,title:string)=>{
    setInfo(e.currentTarget.value);
  }

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
      })
    });
    
    const data:Props2=await res.json() as Props2;
    if(data.message==="OK"){
      setName("");
      setMail("");
      setBirth("");
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
          <div className="animate__animated animate__fadeIn">
            {postlist.map((item:postmenu,index:number)=>(
              <div
                key={index}
                style={{marginTop:"10px"}}
              >
                <TextField 
                  id="outlined-basic" 
                  label={item.title} 
                  variant="outlined" 
                  onChange={(e)=>handleChange(e,item.setInfo,item.title)}
                />
                <p style={{textAlign:"start",color:"gray"}}>ex：{item.example}</p>
              </div>
            ))}
            <div style={{marginTop:"10px"}}>
              <Button 
                variant="contained" 
                onClick={()=>handleClick()}
              >
                追加
              </Button>
            </div>
          </div>
        </div>
      </Contain>
    
    </>
  );
}

export default Addmember;