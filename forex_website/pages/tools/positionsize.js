import PositionSize from '../../components/Tools/PositionSize'
import NavBar from '../../components/HomePage/NavBar'
import HamBurger from '../../components/HomePage/HamBurger'
import SideBar from '../../components/HomePage/SideBar'
import SignUp from '../../components/HomePage/SignUp'
import {useState} from 'react'
import GetInTouch from "../../components/HomePage/GetInTouch";
import Contact from "../../components/HomePage/Contact";
import Footer from "../../components/HomePage/Footer";
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
        <title>Position Size</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
            {isPopUp && <SignUp onClose={registerClickHandler} />}

<div style={{display: "block", backgroundColor:"#2e2e2e", minHeight:"100vh"}}>

     <NavBar onRegisterClick={registerClickHandler} />
  {/* {!clicked && <HamBurger onMenuClick={clickHandler} />} */}
  <HamBurger onMenuClick={clickHandler} />
  {clicked && (
      <SideBar
      onRegisterClick={registerClickHandler}
      onCloseClick={clickHandler}
      />
      )}
            <PositionSize/>
            <GetInTouch />
          <Contact />
          <Footer />
            </div>
        </>
    )
}
