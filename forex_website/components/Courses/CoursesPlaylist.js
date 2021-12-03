import classes from "./CoursesPlaylist.module.css";
import {useState, useEffect} from 'react'
import axios from 'axios'
import LockIcon from '@mui/icons-material/Lock';
import Link from 'next/link'


export default function Component(props) {

    const [ videosContent, setVideosContent ] = useState([]);
    const [ paid, setPaid] = useState(false);

    const gettingCourses = async()=>{
        try{
            const {data} = await axios.post('/api/get-courses',{
                type:props.type
            })
            setVideosContent(data.message)

        }catch(error){
            console.log(error.response.data.message)
        }
    }
    
    useEffect(()=>{
        gettingCourses();
    },[props.type])

    const checkingStudent = async()=>{
        try{
            const {data} = await axios.post('/api/check-student',{
                type:props.type
            })
            setPaid(data.message)

        }catch(error){
            console.log(error.response.data.message)
        }
    }


    useEffect(()=>{
       
        checkingStudent()
    },[props.type])


  return (
      <>
      <div className={classes.body}>
        <h1>{props.type}</h1>
        {videosContent &&
            videosContent.map((data,index)=>{
                const courseTitle = data.title;
                return(
                    <span key={index}>
                    <p>{data.title}</p>
                    <hr />
                    {
                        data.videos.map((data,index)=>{
                            return(
                                <>
                                 {
                                     paid?
                                        <Link href={`/Courses/${props.type}/${courseTitle}/${data.title}`}>
                                     <div>{data.title}
                                     </div>
                                     </Link>
                                     :
                                     <Link href={`/type/${props.type}`}>
                                     <div>{data.title}
                                     <LockIcon style={{fontSize:'15px',position:'relative',top:'2px',left:'3px'}}/>
                                     </div>
                                     </Link>
                                 }
                                </>
                              
                            )
                        })
                    }
                    </span>
                )
            })
        }

        </div>
      </>
  );
}
