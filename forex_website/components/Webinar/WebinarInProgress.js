import classes from './WebinarInProgress.module.css'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import PanToolIcon from '@mui/icons-material/PanTool';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MaximizeIcon from '@mui/icons-material/Maximize';
import MyWebinarImageMinimize from './MyWebinarImageMinimize';
import SideBar from './SideBar'
import {useState} from 'react'

// import video1 from '../../assets/Sample.mp4'
export default function WebinarInProgress() {
    const [isSidebar, setIsSidebar] = useState(false)

    const arrowClickHandler = () => {
        if(!isSidebar){
            // document.getElementById('arrow').style.transform = "translateX(-24vw)"}
            document.getElementById('arrow').style.display='none';}
        else{
            // document.getElementById('arrow').style.transform = "translateX(0)"
            document.getElementById('arrow').style.display = 'flex';
        }
        setIsSidebar(()=>{return !isSidebar});
    }

    return (<>
        {isSidebar && <SideBar onClose={arrowClickHandler}/>}
        <div className={classes.webinarinprogress}>
            {/* <iframe className={classes.video} width="100%" height="657" src="https://www.youtube.com/embed/YNEBhwimJWs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            <div className={classes.video}>
                hello
            </div>
            <span onClick={arrowClickHandler} id="arrow" className={classes.sidebararrow}>
                <ArrowLeftIcon className={classes.iconarrow}/>
            </span>
            <span className={classes.bottomconsole}>
                <section>
                    <span><VideocamOffIcon className={classes.icon}/></span>
                    <span><MicOffIcon className={classes.icon}/></span>
                    <span><PanToolIcon className={classes.icon}/></span>
                    <span className={classes.redicon}><CallEndIcon className={classes.icon}/></span>
                </section>
                <span><MaximizeIcon className={classes.icon}/></span>
            </span>
            <MyWebinarImageMinimize/>
        </div>
        </>
    )
}
