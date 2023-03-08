import { style } from "@vanilla-extract/css";
//import "animate.css"


const container={
  parent:style({
    position:"relative",
    height:"90vh",
    textAlign:"center",
  }),
  child:style({
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translateY(-50%) translateX(-50%)",
    
  })
}

export default container;