import Navbar from '../../components/HomePage/NavBar.js'
import {useRouter} from 'next/router'
import Content from '../../components/Webinar/SliderWebinar.js'
import {useState} from 'react'
import HamBurger from '../../components/HomePage/HamBurger'
import SideBar from '../../components/HomePage/SideBar'
import SignUp from '../../components/HomePage/SignUp'
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
        <title>Webinar/${router.query.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
                {isPopUp && <SignUp onClose={registerClickHandler} />}

        <div style={{backgroundColor:'#2E2E2E'}}>
        <HamBurger onMenuClick={clickHandler} />
          {clicked && (
            <SideBar
              onRegisterClick={registerClickHandler}
              onCloseClick={clickHandler}
            />
          )}
            <Navbar/>
            <Content title={router.query.title} />
        </div>
        </>
    )
}