import Navbar from '../../components/HomePage/NavBar.js'
import HamBurger from '../../components/HomePage/HamBurger'
import SideBar from '../../components/HomePage/SideBar'
import {useRouter} from 'next/router'
import Content from '../../components/Courses/CoursesPlaylist.js'
import { useState } from 'react';
import SignUp from '../../components/HomePage/SignUp'
import Head from 'next/head'


export default function Page() {
    const [clicked, setClicked] = useState(false);

    const router = useRouter();
    const type = router.query.courses;
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
        <title>Courses</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
                {isPopUp && <SignUp onClose={registerClickHandler} />}

        <div style={{backgroundColor:'#2E2E2E',height:'100vh'}}>
        <HamBurger onMenuClick={clickHandler} />
          {clicked && (
            <SideBar
              onRegisterClick={registerClickHandler}
              onCloseClick={clickHandler}
            />
          )}
            <Navbar onRegisterClick={registerClickHandler}/>
            <Content  type={type}/>
        </div>
        </>
    )
}
