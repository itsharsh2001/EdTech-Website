import Signals from '../../../components/ownerAdminPanel/Signals'
import { useState } from "react";
import SignalOverlay from '../../../components/ownerAdminPanel/SignalOverLay'
import AdminNavBar from '../../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'


export default function Page() {
  <Head>
        <title>Signal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    const [overlay, setOverlay] = useState(false)  

  const overlayHandler = () => {
    setOverlay(true)
    console.log("hello")
  }  
    return (
        <>
        {overlay && <SignalOverlay />}
        <div style={{backgroundColor:'#2E2E2E'}}>
        <AdminNavBar/>
            <Signals overlayHandler={overlayHandler}/>
        </div>
        </>
    )
}
