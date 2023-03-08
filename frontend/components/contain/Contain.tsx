import { FC, ReactNode } from "react";
import container from "./form.css";
type Props={
  children:ReactNode;
}
const Contain:FC<Props> = ({children}) => {
  return (
    <>
      <main className={container.parent}>
        <div className={`${container.child}`}>
          {children}
        </div>
      </main>
    </>
  );
}

export default Contain;