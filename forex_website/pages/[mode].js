import Navbar from '../components/HomePage/NavBar.js'
import {useRouter} from 'next/router'
import Content from '../components/Courses/CoursesPlaylist.js'
import Head from 'next/head'

export default function Page() {

    const router = useRouter();
    const type = router.query.courses;


    return (
        <>
        <Head>
        <title>Course/{type}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div style={{backgroundColor:'#2E2E2E',display:'block', minHeight:'100vh'}}>
            <Navbar/>
            <Content type={type}/>
        </div>
        </>
    )
}
