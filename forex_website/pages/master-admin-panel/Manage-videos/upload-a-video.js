import Upload from '../../../components/ownerAdminPanel/upload-a-video'
import Head from 'next/head'

export default function Page() {
    return (
        <>
        <Head>
        <title>Upload a video</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div>
        <Upload/>
        </div>
        </>
    )
}
