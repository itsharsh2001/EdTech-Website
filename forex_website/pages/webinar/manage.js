import ManageWebinar from '../../components/Webinar/ManageWebinar';
// import UploadWebinars from '../../components/Webinar/UploadWebinars';
// import OwnerAdminPanelOverlay from "../../../components/ownerAdminPanel/OwnerAdminPanelOverlay";
// import UploadInputs from '../../../components/ownerAdminPanel/uploadInputs'
import WebinarOverlay from '../../components/Webinar/WebinarOverlay'
import { useState } from "react";
import AdminNavBar from '../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'

export default function Page() {
  const [overlay, setOverlay] = useState(false)  

  const overlayHandler = () => {
    setOverlay(true)
  }  
    
  return (
    <>
    <Head>
        <title>Manage Webinar</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {overlay && <WebinarOverlay />}
      <div style={{ backgroundColor: "#2E2E2E", height: "100vh" }}>
        {/* <ManageWebinar overlayHandler={overlayHandler} /> */}
        <AdminNavBar/>
        <ManageWebinar overlayHandler={overlayHandler}/>
        {/* <UploadWebinars/> */}
      </div>
    </>
  );
}
