import ManageVideos from "../../../components/ownerAdminPanel/manageVideos";
import OwnerAdminPanelOverlay from "../../../components/ownerAdminPanel/OwnerAdminPanelOverlay";
import UploadInputs from '../../../components/ownerAdminPanel/uploadInputs'
import AdminNavBar from '../../../components/ownerAdminPanel/AdminNavBar'
import { useState } from "react";
import Head from 'next/head'

export default function Page() {
  const [overlay, setOverlay] = useState(false)  

  const overlayHandler = () => {
    setOverlay(true)
  }  
    
  return (
    <>
    <Head>
        <title>Manage Videos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {overlay && <OwnerAdminPanelOverlay />}
      <div style={{ backgroundColor: "#2E2E2E", height: "100vh" }}>
        <AdminNavBar/>
        <ManageVideos overlayHandler={overlayHandler} />
      </div>
    </>
  );
}
