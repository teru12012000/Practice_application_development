import { style } from "@vanilla-extract/css";

const memberliststyle={
  contant:style({
    width:"75%",
    margin:"50px auto",
    textAlign:"center",
    '@media':{
      'screen and (min-width:1025px)':{
        width:"50%",
      }
    }
  })
}

export default memberliststyle;