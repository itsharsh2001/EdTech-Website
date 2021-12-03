import Tools from "../../components/Tools/Tools";
import NavBar from "../../components/HomePage/NavBar";
import HamBurger from "../../components/HomePage/HamBurger";
import SideBar from "../../components/HomePage/SideBar";
import SignUp from "../../components/HomePage/SignUp";
import { useState } from "react";
import Head from 'next/head'


export default function Page() {
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    setClicked(() => {
      return !clicked;
    });
  };
  const [isPopUp, setIsPopUp] = useState(false);
  const registerClickHandler = () => {
    setIsPopUp(() => {
      return !isPopUp;
    });
  };

  return (
    <>
    <Head>
        <title>Tools</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {" "}
      {isPopUp && <SignUp onClose={registerClickHandler} />}
      <div style={{display: "block", backgroundColor:"#2e2e2e", minHeight:"100vh"}}>
        <NavBar title="tools" onRegisterClick={registerClickHandler} />
        {/* {!clicked && <HamBurger onMenuClick={clickHandler} />} */}
        <HamBurger onMenuClick={clickHandler} />
        {clicked && (
          <SideBar
            onRegisterClick={registerClickHandler}
            onCloseClick={clickHandler}
          />
        )}
        <Tools />
      </div>
    </>
  );
}
