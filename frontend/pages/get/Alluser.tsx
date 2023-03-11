import Back from "@/components/Back/Back";
import Contain from "@/components/contain/Contain";
import Header from "@/components/Header/Header";
import { memberlist, Props } from "@/data/postdata";
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const getServerSideProps:GetServerSideProps<Props>=async()=>{
  const res=await fetch("http://localhost:5050/member/allusers");
  const data=await res.json();
  return{
    props:{
      message:data.message,
      list:data.list,
    }
  } 
} 




const Alluser:NextPage<Props> = ({message,list}) => {
  const [messa,setMessa]=useState<string>(message);
  const [searchlist,setSearchlist]=useState<memberlist[]|undefined>(list);
  const handleChange=async(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      if(e.currentTarget.value){
        const res=await fetch(`http://localhost:5050/member/search/${e.currentTarget.value}`);
      const data=await res.json();
      if(data.list){
        setSearchlist(data.list as memberlist[])
      }else{
        setSearchlist(undefined);
        setMessa(data.message);
      }
    }else{
      setSearchlist(list)
    }
  }
  return (
    <>
      <Head>
        <title>すべてのユーザー</title>
        <meta name="description" content="登録したユーザーについてです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Back/>
      <div style={{textAlign:"center",marginTop:"20px"}}>
        <TextField 
          id="outlined-basic" 
          label="検索したいワードを入力" 
          variant="outlined" 
          disabled={list?false:true}
          onChange={(e)=>handleChange(e)}
        />
      </div>
      <Contain>
        <>
          <h1 className='animate__animated animate__backInLeft'>登録しているユーザ</h1>
          {searchlist?(
            <TableContainer component={Paper} className="animate__animated animate__fadeIn">
              <Table area-label="memberlist">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">名前</StyledTableCell>
                    <StyledTableCell align="center">メール</StyledTableCell>
                    <StyledTableCell align="center">誕生日(yyyymmdd)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchlist?.map((item:memberlist,index:number)=>(
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{item.name}</StyledTableCell>
                      <StyledTableCell align="center">{item.mail}</StyledTableCell>
                      <StyledTableCell align="center">{item.birth}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ):(
            <p className="animate__animated animate__fadeIn">{messa}</p>
          )}
        </>
      </Contain>
    </>
  );
}

export default Alluser;