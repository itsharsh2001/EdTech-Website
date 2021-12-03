import DataUploaded from '../../../components/ownerAdminPanel/datauploaded'
import OwnerAdminPanelOverlay from "../../../components/ownerAdminPanel/OwnerAdminPanelOverlay";
import Head from 'next/head'

import { useState } from 'react';
export default function Page() {
    const [overlay, setOverlay] = useState(false)  

    const overlayHandler = () => {
    setOverlay(true)
  }  
    return (
        <>
        <Head>
        <title>Data Uploaded</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        {overlay && <OwnerAdminPanelOverlay />}
        <div style={{backgroundColor:'#2E2E2E', height:'100vh'}}>
            <DataUploaded overlayHandler={overlayHandler}/>
        </div>
        </>
    )
}
