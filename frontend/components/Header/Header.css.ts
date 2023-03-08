import { style } from "@vanilla-extract/css";

const headerstyle={
  ground:style({
    backgroundColor:"black",
    color:"white",
    marginTop:-10,
    padding:10,
    
  }),
  h1:style({
    '@media':{
      'screen and (max-width:900px)':{
        fontSize:20,
        textAlign:"center"
      }
    }
  })
}

export default headerstyle;