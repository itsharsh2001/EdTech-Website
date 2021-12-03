import classes from "./JoinWithLaptopMobile.module.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import {useRouter} from 'next/router'
import axios from 'axios'
import {useEffect, useState} from 'react'


export default function JoinWithLaptopMobile() {

  const [link, setLink] = useState(null)

  const gettingFinalWebinar = async()=>{
    try {
      const { data } = await axios.get("/api/get-final-webinar");
      setLink(data.webinar.meetingLink)
    } catch (error) {
      router.push('/')
    }
  }

  useEffect(() => {
    gettingFinalWebinar()
  }, []);

  const router = useRouter();

  return (
    <div className={classes.joinwithlaptopmobile}>
      <div className={classes.first} 
    //   onClick={props.yespre}
      >
        <div onClick={()=>router.push("/webinar/join-meeting")}  className={classes.icon}>
            <LaptopMacIcon
              className={classes.iconc}
              style={{ fill: "white", fontSize: "90px", alignItems: "center" }}
            />
        </div>
        <p onClick={()=>router.push("/webinar/join-meeting")}  className={classes.uploadFileContent}>
          Laptop/Desktop
        </p>
      </div>

      {/* <Link href="/webinar/start-webinar/"> */}
        <div
        // onClick={props.yeslive}
        >
          <div className={classes.icon}>
          <a href={link}>
              <PhoneAndroidIcon
                className={classes.iconc}
                style={{
                  fill: "white",
                  fontSize: "90px",
                  alignItems: "center",
                }}
              />
              </a>
          </div>
          <a href={link} style={{textDecoration:'none'}}>
          <p className={classes.uploadFileContent}>Mobile</p>
          </a>
        </div>
    </div>
  );
}
