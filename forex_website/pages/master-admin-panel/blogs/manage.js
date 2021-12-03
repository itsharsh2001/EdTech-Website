import ManageBlog from '../../../components/ownerAdminPanel/ManageBlog'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Manage Blogs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
            <ManageBlog/>
        </>
    )
}
