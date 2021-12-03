import HomeUI from "../ownerAdminPanel/ui/imagesFileHomeBox";
import classes from "./LandingPage.module.css";
import Link from "next/link";
import {useRouter} from 'next/router'

export default function Component(props) {

  const router = useRouter();

  const basic = ()=>{

    const user = localStorage.getItem('user');
    if(!user){
      props.popup();
      return
    }

    router.push('/type/Basic')

  }

  const midway = ()=>{

    const user = localStorage.getItem('user');
    if(!user){
      props.popup();
      return
    }

    router.push('/type/Midway')

  }

  const higher = ()=>{

    const user = localStorage.getItem('user');
    if(!user){
      props.popup();
      return
    }

    router.push('/type/Advance')

  }

  const textWithBulletPoints = <span>
      Learn how other asset classes like stocks, bonds and commodities can affect the forex market.
    <br/>
    <br/>
    • Live doubt sessions twice in a week.  <br/>
    • Assignments and Quizzes  <br/>
    • Analyse every student’s growth in real time.  <br/>
    • Money management   <br/>
    • Real account trading support after course completion.  <br/>
    • Course completion certificate from Aboota in partner with Dibort.  <br/>
    • 18hrs+ Recorded Sessions  <br/>


  </span>

  const basictextBulletPoints = <span>
    
      Learn the basics on how to choose a forex broker and analyse the currency market
      <br/>
    <br/>

    • Live doubt sessions twice in a week.<br/>
    • Assignments and Quizzes<br/>
    • Analyse every student’s growth in real time.<br/>
    • Money management <br/>
    • 18hrs+ Recorded Sessions<br/>



  </span>


  return (
    <>
      <h1 className={classes.h1}>Courses</h1>
      <h4 className={classes.h4}></h4>
      <div className={classes.box}>
          <div onClick={basic}>
            <HomeUI
              heading="Basic"
              text={basictextBulletPoints}
              isHeading={true}
              image='/allabootaicons/basic.png'
            />
          </div>

          {/* <div onClick={midway}>

            <HomeUI
              heading="Midway"
              text="Take your technical analysis and chart reading skills to another level by learning Heikin Ashi, Elliot Wave Theory, and Harmonic Price Patterns."
              isHeading={true}
              image='/allabootaicons/highschool.png'

            />
          </div> */}

          <div onClick={higher}>
            <HomeUI
              heading="Advance"
              text={textWithBulletPoints}
              isHeading={true}
              image='/allabootaicons/advance.png'
            />
          </div>

      </div>
    </>
  );
}
