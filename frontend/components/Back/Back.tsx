import { IconButton } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Back:FC = () => {
  return (
    <>
      <Link href="/" style={{margin:"20px"}}>
        <IconButton aria-label="back">
          <ArrowBackIcon sx={{fontSize:40}}/>
        </IconButton>
      </Link> 
    </>
  );
}

export default Back;