import Contain from "@/components/contain/Contain";
import Header from "@/components/Header/Header";
import { memberlist } from "@/data/postdata";
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
type Props={
  message:string;
  list:memberlist[]|undefined;
}

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





//SSR
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
  return (
    <>
      <Head>
        <title>すべてのユーザー</title>
        <meta name="description" content="登録したユーザーについてです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Contain>
        <>
          <h1 className='animate__animated animate__backInLeft'>登録しているユーザ</h1>
          {list?(
            <TableContainer component={Paper} className="animate__animated animate__backInLeft animate__delay-1s">
              <Table area-label="memberlist">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">名前</StyledTableCell>
                    <StyledTableCell align="center">メール</StyledTableCell>
                    <StyledTableCell align="center">誕生日(yyyymmdd)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list?.map((item:memberlist,index:number)=>(
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
            <p className="animate__animated animate__backInLeft animate__delay-1s">{message}</p>
          )}
        </>
      </Contain>
    </>
  );
}

export default Alluser;