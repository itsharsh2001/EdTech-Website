import WriteABlog from '../../../components/ownerAdminPanel/WriteABlog'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Write a blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <WriteABlog/>
        </>
    )
}
