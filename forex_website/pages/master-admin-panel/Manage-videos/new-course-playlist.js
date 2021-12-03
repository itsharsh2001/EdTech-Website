import NewCourse from '../../../components/ownerAdminPanel/newCoursePlaylist'
import Head from 'next/head'


export default function Page() {
    return (
        <>
        <Head>
        <title>New Course Playlist</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <NewCourse/>
        </>
    )
}
