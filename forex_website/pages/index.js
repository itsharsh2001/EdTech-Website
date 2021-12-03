import classes from "./home.module.css";
import NavBar from "../components/HomePage/NavBar.js";
import About from "../components/HomePage/About";
import About2 from "../components/HomePage/About2";
import About3 from "../components/HomePage/About3";
import Banner from "../components/HomePage/Banner";
import GetInTouch from "../components/HomePage/GetInTouch";
import Contact from "../components/HomePage/Contact";
import Footer from "../components/HomePage/Footer";
import HamBurger from "../components/HomePage/HamBurger";
import SideBar from "../components/HomePage/SideBar";
import { useState } from "react";
import Slider from "../components/HomePage/Slider";
import Slider2 from "../components/HomePage/Slider2.js";
import SignUp from "../components/HomePage/SignUp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from 'next/head'
import VideoBanner from '../components/HomePage/bannerVideo.js'

// import img1 from '/img1.jpg'



export default function Home() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [signal, setSignal] = useState(null);
  const [webinar, setWebinar] = useState(null);
  const [isMeetWebinar, setIsMeetWebinar] = useState(false);
  const [isWebWebinar, setIsWebWebinar] = useState(false);
  const [paidClients, setpaidClients] = useState(false);


  const [meet, setMeet] = useState(false);
  const [allWebinar, setAllWebinar] = useState([]);

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

  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/get-signal");
      setSignal(data.message);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/get-final-webinar");
      setWebinar(data.webinar);
      setIsMeetWebinar(data.meet);
      setIsWebWebinar(data.web);
      if (data.web) {
        try {
          const { data } = await axios.get("/api/check-paid-client");
          setpaidClients(data.message);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const pushToMeet = async () => {
    router.push("/webinar/join-with-laptop-mobile");
  };

  return (
    <>
      <div>
        {/* <div className={classes.blur}></div> */}
        {isPopUp && <SignUp onClose={registerClickHandler} />}
        <div className={classes.background}>
          <NavBar title="home" onRegisterClick={registerClickHandler} />
          {/* {!clicked && <HamBurger onMenuClick={clickHandler} />} */}
          <HamBurger onMenuClick={clickHandler} />
          {clicked && (
            <SideBar
              onRegisterClick={registerClickHandler}
              onCloseClick={clickHandler}
            />
          )}

          <VideoBanner/>

          {isMeetWebinar && (
            <a style={{textDecoration:'none'}} rel="noreferrer"  target="_blank" href={webinar.googleMeetLink}>
              <Banner title={webinar.title} thumbnail={webinar.thumbnail}/>
            </a>
          )}

          <div onClick={pushToMeet}>
            {paidClients && isWebWebinar && <Banner title={webinar.title} thumbnail={webinar.thumbnail} />}
          </div>

          <Slider2 heading='Amazing Videos' img1='/slider1.jpg' img2='/slider2.jpg' img3='/slider3.jpg' img4='/slider4.jpg' />

          <About /> 
          {/* <About2 />
          <About3 /> */}

          {/* <Slider heading='Webinars' /> */}

          <GetInTouch />
          <Contact />
          <Footer />

          <a target="_blank" rel="noreferrer" href='https://wa.me/+917009124646 '>
          <span className={classes.whatsapp}></span>
          </a>

          {signal && (
            <a target="_blank"  rel="noreferrer" href={signal.signalFile}>
              <span>
                <p className={classes.textSignal}></p>
                <span className={classes.signal}></span>
              </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
