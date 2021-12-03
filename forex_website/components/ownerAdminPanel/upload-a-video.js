import classes from './uploading-a-video.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import { useState } from 'react';
import axios from 'axios'

export default function Home(props) {

    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const uploadVideo = async (file)=>{
        setUploading(true)
       try{
           const videoData = new FormData();
           videoData.append('video',file);
        const {data} = await axios.post('/api/instructor/add-videos',videoData,{
            onUploadProgress: (load)=>{
                setProgress(Math.round((100*load.loaded)))
            }
        })
        localStorage.setItem('videoLink',data.link)
        props.uploadInputsHandler();

       }catch(error){
        setUploading(false)
        console.log(error)
       }
    }

    return (
        <InstructorRouter>
       
        <div className={classes.box}>
                <div>
                <div className={classes.icon}>
                    <input type="file" onChange={(e)=>uploadVideo(e.target.files[0])}  accept='video/*' className={classes.inputFile} name="" id="file" />
                    <label htmlFor="file">
                <CloudUploadIcon className={classes.iconc}  style={{fill:'white',fontSize:'90px',alignItems:'center'}}/>
                </label>
                </div>
                {
                    !uploading?<p className={classes.uploadFileContent}>Browse a file OR drag & drop</p>:
                    <p className={classes.uploadFileContent} loading={progress}>Uploading....</p>
                }
                </div>
        </div>
        </InstructorRouter>
    )
}
