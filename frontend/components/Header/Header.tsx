import { FC } from "react";
import headerstyle from "./Header.css";

const Header:FC = () => {
  return (
    <>
      <header className={headerstyle.ground}>
        <div>
          <h1 className={headerstyle.h1}>Learing Web App</h1>
        </div>
      </header>
    </>
  );
}

export default Header;