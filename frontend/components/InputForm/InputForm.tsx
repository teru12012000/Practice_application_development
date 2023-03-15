import { postmenu } from "@/data/postdata";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { FC, ChangeEvent, Dispatch, SetStateAction, useState } from "react";
type Props={
  list:postmenu[];
  btn:string;
  func:()=>Promise<void>
}
const InputForm:FC<Props> = ({list,btn,func}) => {
  const [show,setShow]=useState<boolean>(false);
  const handleChange=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,setInfo:Dispatch<SetStateAction<string|undefined>>,title:string)=>{
    setInfo(e.currentTarget.value);
  }
  const handleClickShowPassword = () => setShow((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="animate__animated animate__fadeIn">
    {list.map((item:postmenu,index:number)=>(
      <div
        key={index}
        style={{marginTop:"10px"}}
      >
        {item.title!=="パスワード"?(
          <TextField 
            id="outlined-basic" 
            label={item.title} 

            value={item.info}
            onChange={(e)=>handleChange(e,item.setInfo,item.title)}
          />
        ):(
          <FormControl sx={{ m: 1,width:"80%"}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={show? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {show? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(e)=>handleChange(e,item.setInfo,item.title)}
            />
          </FormControl>
        )}
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