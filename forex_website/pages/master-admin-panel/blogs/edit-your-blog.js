import EditYourBlog from '../../../components/ownerAdminPanel/EditYourBlog'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Edit Your Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <EditYourBlog/>
        </>
    )
}
