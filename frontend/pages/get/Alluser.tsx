import Back from "@/components/Back/Back";
import Contain from "@/components/contain/Contain";
import Header from "@/components/Header/Header";
import MemberList from "@/components/memberlist/MemberList";
import { memberlist, Props } from "@/data/postdata";


import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";

export const getServerSideProps:GetServerSideProps<Props>=async()=>{
  const res=await fetch("http://localhost:5050/member/allusers");
  const data=await res.json();
  console.log(data.list)
  return{
    props:{
      message:data.message,
      list:data.list??[],
    }
  } 
} 




const Alluser:NextPage<Props> = ({message,list}) => {
  const [messa,setMessa]=useState<string>(message);
  const [searchlist,setSearchlist]=useState<memberlist[]|[]>(list);
  console.log(searchlist);
  return (
    <>
      <Head>
        <title>すべてのユーザー</title>
        <meta name="description" content="登録したユーザーについてです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MemberList
        list={list}
        messa={messa}
        searchlist={searchlist}
        setMessa={setMessa}
        setSearchlist={setSearchlist}
        change={false}
      />
    </>
  );
}

export default Alluser;