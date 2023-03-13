import Contain from "@/components/contain/Contain";
import Header from "@/components/Header/Header";
import { linkdata, successlink } from "@/data/linkdata";
import { Button } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Success:NextPage = () => {
  return (
    <>
      <Head>
        <title>アプリ開発の勉強</title>
        <meta name="description" content="今回はユーザー登録と閲覧に加えて投稿について" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Contain>
        <div>
          <h1 className='animate__animated animate__backInLeft'>登録成功</h1>
          {successlink.map((item:linkdata,index:number)=>(
            <div 
              key={index} 
              className={`animate__animated animate__backInLeft animate__delay-1s`}
              style={{marginTop:"10px"}}
            >
              <Link href={item.link} key={index} target={item.target} style={{textDecoration:"none"}}>
                <Button variant="contained" >
                  {item.title}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Contain>
    </>
  );
}

export default Success;