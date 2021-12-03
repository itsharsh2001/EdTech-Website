import {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import classes from './Video.module.css'
import ReactPlayer from 'react-player'
import {useRouter} from 'next/router'

export default function Component(props) {

    const router = useRouter();

    const [ videosContent, setVideosContent] = useState([])
    const [video,setVideo] = useState([props.type1])


    const gettingVideo = async()=>{
        try{
            const {data} = await axios.post('/api/get-video',{
                type:video[0][0],
                title:video[0][1],
                videoName:video[0][2]
            })
            setVideosContent(data.message)
            console.log(data.message)
        }catch(error){
           
        }
    
        
    }


    useEffect(()=>{
        gettingVideo()
    },[])

    const checkingStudent = async ()=>{
        const {data} = await axios.post('/api/check-student',{
            type:props.type
        })
        if(data.message){
            return
        }else{
            router.push('/')
        }
    }

    // useEffect(()=>{

    //     checkingStudent()
      
    
    //   },[])

  return (
      <>
      <div className={classes.body}>
          <h1>{videosContent.title}</h1>
            <video src={videosContent.file} controlsList="nodownload" controls poster={videosContent.thumbnail}>
            <track src={videosContent.caption} label="English" kind="captions" srcLang="fr" />
                </video>
            <p>{videosContent.description}</p>
            <a rel="noreferrer" href={videosContent.notes} target="_blank">
            <button>Download Attached Pdf File</button>
            </a>
        </div>
      </>
  );
}
