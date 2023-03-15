import Header from "@/components/Header/Header";
import MemberList from "@/components/memberlist/MemberList";
import { memberlist, Props } from "@/data/postdata";
import { Button } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
export const getServerSideProps:GetServerSideProps<Props>=async()=>{
  const res=await fetch("http://localhost:5050/member/allusers");
  const data=await res.json();
  return{
    props:{
      message:data.message,
      list:data.list??[],
    }
  } 
} 
const ChangeHome:NextPage<Props> = ({message,list})=> {
  const [messa,setMessa]=useState<string>(message);
  const [searchlist,setSearchlist]=useState<memberlist[]|[]>(list);
  const router=useRouter();
  return (
    <>
      <Head>
        <title>編集</title>
        <meta name="description" content="ユーザー編集について" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MemberList
        list={list}
        messa={messa}
        searchlist={searchlist}
        setMessa={setMessa}
        setSearchlist={setSearchlist}
        change={true}
      />
      <div style={{textAlign:"center"}}>
        <Link href="/post/Addmember">
          <Button variant="contained">
            ユーザー追加
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ChangeHome;