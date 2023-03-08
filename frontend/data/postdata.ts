import { Dispatch, SetStateAction } from "react";

export type memberlist={
  name:string;
  mail:string;
  birth:string;
}

export type postmenu={
  title:string;
  example:string;
  setInfo:Dispatch<SetStateAction<string>>;
}

