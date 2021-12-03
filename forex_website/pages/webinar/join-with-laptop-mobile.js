import JoinWithLaptopMobile from '../../components/Webinar/JoinWithLaptopMobile'
import Navbar from '../../components/HomePage/NavBar'
import HamBurger from '../../components/HomePage/HamBurger'
import SideBar from '../../components/HomePage/SideBar'
import SignUp from '../../components/HomePage/SignUp'
import Head from 'next/head'

import { useState } from "react";
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
    return (<>
    <Head>
        <title>Join Meeting</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    {isPopUp && <SignUp onClose={registerClickHandler} />}
        <div style={{backgroundColor: '#2e2e2e', display: 'block', minHeight: '100vh', width: '100%'}} >
        <Navbar/>
        <HamBurger onMenuClick={clickHandler} />
          {clicked && (
            <SideBar
              onRegisterClick={registerClickHandler}
              onCloseClick={clickHandler}
            />
          )}
        <JoinWithLaptopMobile/>
        </div>
        </>
    )
}
