import Requests from '../../../components/ownerAdminPanel/Requests'
import AdminNavBar from '../../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'


export default function Page() {
    return (
        <>
        <Head>
        <title>Requests</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div style={{backgroundColor:'#2E2E2E'}}>
            <AdminNavBar/>
            <Requests/>
        </div>
        </>
    )
}
