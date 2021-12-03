import classes from "./ManageWebinar.module.css";
import {useEffect, useState} from 'react'
import axios from 'axios'
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DoneIcon from "@mui/icons-material/Done";
// import { useEffect, useState } from "react";
import {useRouter} from 'next/router'

export default function ManageWebinar(props) {

  const router = useRouter();

  const [webinars, setWebinars] = useState([]);
  // const [isDoneIcon, setIsDoneIcon] = useState(false)

  const gettingPreRecordedWebinars = async()=>{
    try{

      const {data} = await axios.get('/api/get-recorded-webinars');
      setWebinars(data.message)
      console.log(data.message)
      
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    gettingPreRecordedWebinars()
  },[])

  const doneIconClickHandler = () => {
    return null;
  }


  const deleteHandler = async (title) => {
    try{
      const deleteWebinar = await axios.post('/api/delete-recorded-webinar',{
        title:title
      })
      router.reload();
    }catch(error){
      console.log(error.response.data.message)
    }
   
  }

  return (
    <div className={classes.baap} >
      <h1 className={classes.h1}>Manage Webinars</h1>
      <h3 className={classes.h3}>
        Hii Nikhil !&nbsp;
        {/* <span
          onClick={props.overlayHandler}
          style={{ color: "#0099FF", cursor: "pointer" }}
        >
          uploading a video.
        </span> */}
        <span
          onClick={props.overlayHandler}
          style={{ color: "#0099FF", cursor: "pointer" }}
        >
          upload a webinar
        </span>&nbsp;
         
      </h3>

      <div className={classes.managesignals}>
          {/* <div className={classes.sideicons}>
            <DeleteForeverIcon />
            <VisibilityOffIcon />
          </div> */}

          {webinars.map((i, item) => {
            return (
              <span key={item}>
                <span className={classes.flexbox}>
                      <section>
                        
                          <div className={classes.videos}>
                            <img src={i.thumbnail} />
                            <span onClick={doneIconClickHandler} className={classes.icon}>
                              <DeleteForeverIcon onClick={()=>deleteHandler(i.title)} />
                            </span>
                            <a href={i.video} rel="noreferrer" target="_blank">
                            <h2 style={{ color: "white" }}>{i.title}</h2>
                        </a>
                          </div>
                      </section>
                    
                 
                </span>
              </span>
            );
          })}
        </div>


    </div>
  );
}
