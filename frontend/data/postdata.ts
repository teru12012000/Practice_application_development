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
  info:string|undefined;
  setInfo:Dispatch<SetStateAction<string|undefined>>;
}

export type Props={
  message:string;
  list:memberlist[]|[];
}
export type Props2={
  message:string
}
export type Props3={
  message:string;
  list:memberlist|undefined;
}

