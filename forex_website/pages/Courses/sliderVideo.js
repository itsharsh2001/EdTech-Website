import Home from '../../components/Courses/LandingPage.js'
import Navbar from '../../components/HomePage/NavBar.js'
import SideBar from '../../components/HomePage/SideBar.js'
import HamBurger from '../../components/HomePage/HamBurger.js'
import SignUp from '../../components/HomePage/SignUp'
import {useState} from 'react'
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

      
      const settingPopUp = () => {
        setIsPopUp(true)
      }


    return (
        <>
        <Head>
        <title>Free Video</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
                {isPopUp && <SignUp onClose={registerClickHandler} />}

        <div style={{backgroundColor:'#2E2E2E',minHeight:'100vh'}}>
            <Navbar onRegisterClick={registerClickHandler} />
            <HamBurger onMenuClick={clickHandler} />
          {clicked && (
            <SideBar
              onRegisterClick={registerClickHandler}
              onCloseClick={clickHandler}
            />
          )}
            <video src='https://souravclient.s3.ap-south-1.amazonaws.com/20211014-FC-M1L1-What+is+Forex-Aboota-V1.2.mp4' type="video/mp4" controls autoPlay style={{width:'80vw',height:'80vh',borderRadius:'10px',display:'block',margin:'auto',marginTop:'10px'}}></video>
        </div>
        </>
    )
}
