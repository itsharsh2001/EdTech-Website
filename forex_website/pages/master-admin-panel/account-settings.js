import AccountSettings from '../../components/ownerAdminPanel/AccountSettings'
import AdminNavBar from '../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'


export default function Page() {
    return (
        <div style={{backgroundColor: '#2e2e2e', display: 'block', minHeight: '100vh', width: '100%'}}>
            <Head>
        <title>Account Settings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
            <AdminNavBar/>
            <AccountSettings/>
        </div>
    )
}
