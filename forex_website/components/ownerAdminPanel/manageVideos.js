import classes from "./manageVideos.module.css";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DoneIcon from "@mui/icons-material/Done"
import {useRouter} from 'next/router';

export default function Home(props) {

  const router = useRouter();

  const [allvideos, setAllVidoes] = useState([]);
  // const [isDoneIcon, setIsDoneIcon] = useState(false)


  const getAllCourses = async ()=>{
    try {
      const { data } = await axios.get("/api/get-all-courses");

      setAllVidoes(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCourses()
  }, []);

  const doneIconClickHandler = () => {
    return null;
  }

  const deleteVideo = async (typeOfPlaylist,titleOfPlaylist,titleOfVideo) => {

    try{

      const {data} = await axios.post('/api/delete-video',{
        type:typeOfPlaylist,
        title:titleOfPlaylist,
        videoName:titleOfVideo
      })
      
      router.reload()

    }catch(error){
      console.log(error)
    }


  }

  return (
    <InstructorRouter>
      <div className={classes.managevideos}>
        <h1 className={classes.h1}>Manage Videos</h1>
        <h3 className={classes.h3}>
          Hii Nikhil !{" "}
          <span
            onClick={props.overlayHandler}
            style={{ color: "#0099FF", cursor: "pointer" }}
          >
            {" "}
            upload a video.{" "}
          </span>
        </h3>
        <div className={classes.managesignals}>
          {/* <div className={classes.sideicons}>
            <DeleteForeverIcon />
            <VisibilityOffIcon />
          </div> */}

          {allvideos.map((i, item) => {
            const typeForDelete = i.type;
            const titleForDelete = i.title;
            return (
              <span key={item}>
                <h1 className={classes.h1}>
                  {i.title}-{i.type}
                </h1>
                <span className={classes.flexbox}>
                  {i.videos.map((i, item) => {
                    return (
                      <section key={item} className={classes.grid}>
                       
                          <div className={classes.videos}>
                            <img src={i.thumbnail} />
                            <span onClick={doneIconClickHandler} className={classes.icon}>
                             <DeleteForeverIcon onClick={()=>deleteVideo(typeForDelete,titleForDelete,i.title)} />
                            </span>
                            <a href={i.file} rel="noreferrer" target="_blank">
                            <h2 style={{ color: "white" }}>{i.title}</h2>
                            </a>
                          </div>
                      </section>
                    );
                  })}
                </span>
              </span>
            );
          })}
        </div>

      </div>
    </InstructorRouter>
  );
}
