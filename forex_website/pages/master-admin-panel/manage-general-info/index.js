import ManageGeneralInfo from '../../../components/ownerAdminPanel/ManageGeneralInfo'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Manage General Info</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
            <ManageGeneralInfo/>
        </>
    )
}
