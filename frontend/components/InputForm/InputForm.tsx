import { postmenu } from "@/data/postdata";
import { Button, TextField } from "@mui/material";
import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
type Props={
  list:postmenu[];
  btn:string;
  func:()=>Promise<void>
}
const InputForm:FC<Props> = ({list,btn,func}) => {
  const handleChange=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,setInfo:Dispatch<SetStateAction<string|undefined>>,title:string)=>{
    setInfo(e.currentTarget.value);
  }
  return (
    <div className="animate__animated animate__fadeIn">
    {list.map((item:postmenu,index:number)=>(
      <div
        key={index}
        style={{marginTop:"10px"}}
      >
        <TextField 
          id="outlined-basic" 
          label={item.title} 
          
          value={item.info}
          onChange={(e)=>handleChange(e,item.setInfo,item.title)}
        />
        <p style={{textAlign:"start",color:"gray"}}>ex：{item.example}</p>
      </div>
    ))}
    <div style={{marginTop:"10px"}}>
      <Button 
        variant="contained" 
        onClick={func}
      >
        {btn}
      </Button>
    </div>
  </div>
  );
}

export default InputForm;