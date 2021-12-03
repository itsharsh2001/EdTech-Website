import EditYourContactDetails from '../../components/ownerAdminPanel/EditYourContactDetails'
import AdminNavBar from '../../components/ownerAdminPanel/AdminNavBar'
import Head from 'next/head'


export default function Page() {
    return (<>
    <Head>
        <title>Edit Your Contact Details</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <AdminNavBar/>
        <EditYourContactDetails/>
        </>
    )
}
