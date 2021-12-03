import Uploading from '../../../components/ownerAdminPanel/Uploading'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Uploading</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div>
            <Uploading/>
        </div>
        </>
    )
}
