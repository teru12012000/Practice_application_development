import Back from "@/components/Back/Back";
import Contain from "@/components/contain/Contain";
import Header from "@/components/Header/Header";
import InputForm from "@/components/InputForm/InputForm";
import { memberlist, postmenu, Props, Props2, Props3 } from "@/data/postdata";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export const getStaticPaths:GetStaticPaths<Params>=async()=>{
  const res=await fetch("http://localhost:5050/member/allusers");
  const resdata=await res.json();
  const paths=resdata.list?.map((item:memberlist)=>(`/change/${item.id}`));
  return {
    paths:paths ?? [],
    fallback:false,
  }
}

export const getStaticProps:GetStaticProps<Props3,Params>=async(context)=>{
  const id=context.params?.id;
  const res=await fetch(`http://localhost:5050/member/${id}`);
  const resdata:Props3=await res.json() as Props3;
  return {
    props:{
      message:resdata.message,
      list:resdata.list,
    }
  }
}

const Change:NextPage<Props3> = ({message,list})=> {
  const router=useRouter(); 
  const [name,setName]=useState<string|undefined>(list?.name);
  const [mail,setMail]=useState<string|undefined>(list?.mail);
  const [birth,setBirth]=useState<string|undefined>(list?.birth);
  const [canpush,setCanpush]=useState<boolean>(true);
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
    }
  ];
  const handleClick=async()=>{
    const res=await fetch(`http://localhost:5050/member/changeinfo/${list?.id}`,{
      method:"PUT",
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
    if(data.message==="ユーザーを正常に更新しました。"){
      setName("");
      setMail("");
      setBirth("");
      alert("ユーザーを正常に更新しました。");
      router.push("/change/ChangeHome");
    }else{
      alert(`エラーメッセージ：${data.message}`);
    }
  }
  return (
    <>
      <Head>
        <title>ユーザー編集</title>
        <meta name="description" content="ユーザーを登録するところです" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Back/>
      <Contain>
        <div>
          <h1 className='animate__animated animate__backInLeft'>ユーザーの編集</h1>
          <InputForm
            list={postlist}
            btn="編集"
            func={handleClick}
          />
        </div>
      </Contain>
    
    </>
  )
}

export default Change;