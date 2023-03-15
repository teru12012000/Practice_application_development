import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import Back from "../Back/Back";
import Header from "../Header/Header";
import { Button, Paper, Table, TableBody,TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { memberlist } from "@/data/postdata";
import { StyledTableCell, StyledTableRow } from "@/styles/TableStyle";
import memberliststyle from "./memberlist.css";
import Link from "next/link";
import { NextRouter } from "next/router";

type Props={
  list:memberlist[]|[];
  messa:string;
  searchlist:memberlist[]|[];
  setMessa:Dispatch<SetStateAction<string>>;
  setSearchlist:Dispatch<SetStateAction<memberlist[]|[]>>;
  change:boolean;
}
const MemberList:FC<Props> = ({list,messa,searchlist,setMessa,setSearchlist,change}) => {
  const handleChange=async(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    if(e.currentTarget.value){
      const res=await fetch(`http://localhost:5050/member/search/${e.currentTarget.value}`);
      const data=await res.json();
      if(data.list){
        setSearchlist(data.list as memberlist[])
      }else{
        setSearchlist([]);
        setMessa(data.message);
      }
    }else{
      setSearchlist(list)
    }
  }
  const handledeleteclick=async(id:number)=>{
    const strid=String(id);
    const res=await fetch(`http://localhost:5050/member/deletemember/${strid}`,{
      method:"DELETE",
    });
    const data=await res.json();
    if(data.message==="ユーザーを削除しました"){
      alert("ユーザーを削除しました");
      window.location.reload();
    }else{
      alert(data.message);
    }
  }
  return (
    <>
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
      <div className={memberliststyle.contant}>
        <h1 className='animate__animated animate__backInLeft'>メンバー設定</h1>
        {searchlist[0]?(
          <TableContainer component={Paper} className="animate__animated animate__fadeIn" style={{maxHeight:400}}>
            <Table area-label="memberlist">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">名前</StyledTableCell>
                  <StyledTableCell align="center">メール</StyledTableCell>
                  <StyledTableCell align="center">誕生日(yyyymmdd)</StyledTableCell>
                  {change?(
                    <>
                      <StyledTableCell align="center">編集</StyledTableCell>
                      <StyledTableCell align="center">削除</StyledTableCell>
                    </>
                  ):null}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchlist?.map((item:memberlist,index:number)=>(
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{item.name}</StyledTableCell>
                    <StyledTableCell align="center">{item.mail}</StyledTableCell>
                    <StyledTableCell align="center">{item.birth}</StyledTableCell>
                    {change?(
                        <>
                          <StyledTableCell align="center">
                            <Link href={`/change/${item.id}`}>
                              <Button variant="contained">
                                編集
                              </Button>
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button 
                              variant="contained"
                              onClick={()=>handledeleteclick(item.id)}
                            >
                              削除
                            </Button>
                          </StyledTableCell>
                        </>
                      ):null}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ):(
          <p className="animate__animated animate__fadeIn">{messa}</p>
        )}
      </div>
    </>
  );
}

export default MemberList;