import ManageBlogs from '../../../components/ownerAdminPanel/ManageBlogs'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Manage Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
            <ManageBlogs/>
        </>
    )
}