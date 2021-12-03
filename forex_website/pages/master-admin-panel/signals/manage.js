import ManageSignals from '../../../components/ownerAdminPanel/ManageSignals'
import AdminNavBar from '../../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'


export default function Page() {
    return (
        <>
        <Head>
        <title>Manage Signals</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <AdminNavBar/>
            <ManageSignals/>
        </>
    )
}
