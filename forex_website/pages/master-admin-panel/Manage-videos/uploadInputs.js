import dynamic from 'next/dynamic'
const UploadInputs = dynamic(
    () => import('../../../components/ownerAdminPanel/uploadInputs'),
    { ssr: false }
  )
import Head from 'next/head'

export default function Page() {
    <Head>
        <title>Upload Inputs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    return (
        <>
        <div>
        <UploadInputs/>
        </div>
        </>
    )
}
