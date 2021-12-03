import StartWebinar from '../../components/Webinar/StartWebinar'
import AdminNavBar from '../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'


export default function Page() {
    return (
    <div style={{backgroundColor: '#2e2e2e', width: '100%', display:'block', minHeight:'100vh'}} >
        <Head>
        <title>Start Webinar</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        
        <AdminNavBar/>
        <StartWebinar/>
        
    </div>
    )
}
