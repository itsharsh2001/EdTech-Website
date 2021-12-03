import classes from "./Signals.module.css";
import HomeUI from "./ui/homeBox";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import {useState} from 'react'
import axios from "axios";
import Link from 'next/link'
import {useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {useRouter} from 'next/router'

export default function Signals(props) {

  const router = useRouter();

  const [signal, setSignal] = useState(null)
  const [uploading, setUploading] = useState(false)


  const signalHandler = async (e)=>{
    console.log(e);
    setUploading(true);

    var formData = new FormData();
    formData.append("filename", e);
    try{
      const {data} = await axios.post('/api/instructor/signals',formData)
      props.overlayHandler();
     }catch(error){
      setUploading(false);
      console.log(error)
     }
  }

  const getSignals = async()=>{
    try
    { 
     const {data} = await axios.get('/api/get-signal');
    setSignal(data.message)
   }
     catch(error){
       console.log(error)
     }
  }

  useEffect(()=>{
    getSignals()

  },[])

  const deleteIcon =async ()=>{
    try{
      const {data} = await axios.get('/api/delete-signal')
      router.reload();
    }catch(error){
      console.log(error)
    }
   
    
  }
    
  return (<InstructorRouter>
    <div className={classes.signals}>
      
      <h1>Signals</h1>
      {
        signal &&       <span>Current Signal -- <a style={{color:'lightblue'}} rel="noreferrer" target="_blank" href={signal.signalFile}> {signal.signalHeading}</a>
                <DeleteIcon onClick={deleteIcon}/>
        </span>
      }

{
        !signal &&       <span> No Signal Yet</span>
      }

      <input type="file" accept = "application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  onChange={(e)=>signalHandler(e.target.files[0])} style={{display:'none'}} name="" id="uploadSignal" />
      <label htmlFor="uploadSignal">
      <div className={classes.box}>


        {
          uploading?
          <HomeUI
          heading="Uploading..."
          text="Upload a new signal file"
          isHeading={true}
          image='/allabootaicons/admindashboard/upload.png'
        />
        :
        <HomeUI
        heading="Upload New Signal"
        text="Upload a new signal file"
        isHeading={true}
        image='/allabootaicons/admindashboard/upload.png'

      />
        }
        
      </div>
      </label>
    </div>
    </InstructorRouter>
  );
}
