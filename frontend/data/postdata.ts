import { Dispatch, SetStateAction } from "react";

export type memberlist={
  name:string;
  mail:string;
  birth:string;
  id:number;
}

export type postmenu={
  title:string;
  example:string;
  setInfo:Dispatch<SetStateAction<string>>;
}

export type Props={
  message:string;
  list:memberlist[]|undefined;
}
export type Props2={
  message:string
}

