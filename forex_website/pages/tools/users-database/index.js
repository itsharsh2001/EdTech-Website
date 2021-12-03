import UserDatabase from '../../components/UserDatabase/UserDatabase.js'
import AdminNavBar from '../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>User Database</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div style={{backgroundColor:'#2e2e2e', display:'block', width:'100%', minHeight:'100vh'}} >

        <AdminNavBar/>
            <UserDatabase/>
        </div>
        </>
    )
}
