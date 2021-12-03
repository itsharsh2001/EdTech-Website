import {useState, useEffect} from 'react'
import axios from 'axios'
import classes from './sliderWebinar.module.css'

export default function Component(props) {

    const [ videosContent, setVideosContent] = useState([])

    const getParticularWebianar = async()=>{
        try{
            const {data} = await axios.post('/api/get-particular-webinar',{
                title:props.title
            })
            setVideosContent(data.webinar)
        }catch(error){
            // router.push('/')
        }
    
    }


    useEffect(()=>{
        getParticularWebianar();
    },[])

  return (
      <>
      <div className={classes.body}>
          <h1>{videosContent.title}</h1>
            <video src={videosContent.video} controls poster={videosContent.thumbnail}>
            <track src={videosContent.caption} label="English" kind="captions" srcLang="fr" />
                </video>
            <p>{videosContent.description}</p>
        </div>
      </>
  );
}
