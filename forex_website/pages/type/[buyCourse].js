import Home from '../../components/Courses/buy-course.js'
import Navbar from '../../components/HomePage/NavBar.js'
import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'
import axios from 'axios'
import HamBurger from '../../components/HomePage/HamBurger'
import SideBar from '../../components/HomePage/SideBar'
import Head from 'next/head'

export default function Page() {
    const [clicked, setClicked] = useState(false);

    const router = useRouter();
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
        <title>Course/{router.query.buyCourse}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div style={{backgroundColor:'#2E2E2E',height:'100vh'}}>
        <HamBurger onMenuClick={clickHandler} />
          {clicked && (
            <SideBar
              onRegisterClick={registerClickHandler}
              onCloseClick={clickHandler}
            />
          )}
            <Navbar/>
            <Home type={router.query.buyCourse}/>
        </div>
        </>
    )
}
