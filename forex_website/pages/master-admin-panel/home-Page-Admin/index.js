import Home from '../../../components/ownerAdminPanel/adminHome'
import AdminNavBar from '../../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'


export default function Page() {
    return (
        <>
        <Head>
        <title>Home Page Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div style={{backgroundColor:'#2E2E2E'}}>
            <AdminNavBar/>
            <Home/>

        </div>
        </>
    )
}
