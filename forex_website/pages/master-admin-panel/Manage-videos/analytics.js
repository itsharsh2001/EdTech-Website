import Analytics from '../../../components/ownerAdminPanel/analytics'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Analytics</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div>
        <Analytics/>
        </div>
        </>
    )
}
