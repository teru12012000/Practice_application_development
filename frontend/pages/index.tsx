import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import Contain from '@/components/contain/Contain'
import Link from 'next/link';
import {linkdata, openinglink} from "../data/linkdata"
import { Button } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>アプリ開発の勉強</title>
        <meta name="description" content="今回はユーザー登録と閲覧に加えて投稿について" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Contain>
        <div>
          <h1 className='animate__animated animate__backInLeft'>hello</h1>
          {openinglink.map((item:linkdata,index:number)=>(
            <div key={index} className="animate__animated animate__backInLeft animate__delay-1s">
              <Link href={item.link} key={index} target={item.target}>
                <Button variant="contained">
                  {item.title}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Contain>
    </>
  )
}
