export type linkdata={
  link:string;
  title:string;
  target:string;
}

export const openinglink:linkdata[]=[
  {
    link:"/get/Alluser",
    title:"すべてのユーザ閲覧",
    target:"",
  },{
    link:"/change/ChangeHome",
    title:"ユーザー編集",
    target:"",
  }
];
export const successlink:linkdata[]=[
  {
    link:"/",
    title:"ホームへ",
    target:"",
  },{
    link:"/get/Alluser",
    title:"すべてのユーザ閲覧",
    target:"",
  },{
    link:"/post/Addmember",
    title:"続けてユーザ登録",
    target:"",
  },{
    link:"/change/ChangeHome",
    title:"編集ページへ",
    target:"",
  }
] 