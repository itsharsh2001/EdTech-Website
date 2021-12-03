import dynamic from 'next/dynamic'
const Zoom = dynamic(
  () => import('../../components/Webinar/meeting'),
  { ssr: false }
)
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'

export default function Page() {

    const router = useRouter();


    useEffect(()=>{
        router.prefetch('../../components/Webinar/meeting')
    },[])
    
  return (
    <>
     <Zoom/>
    </>
  );
}
