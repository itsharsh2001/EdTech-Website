import classes from './WebinarMyScreen.module.css'
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import {useRouter} from 'next/router';

export default function WebinarMyScreen() {

    const router = useRouter();

    const joinHandler = ()=>{
        router.push('/webinar/join-room/false')
    }

    return (
        <div className={classes.webinarmyscreen}>
            <section>
                <span><VideocamIcon className={classes.icon}/></span>
                <span><MicIcon className={classes.icon}/></span>
            </section>
            <button onClick={joinHandler}>Join Now</button>
        </div>
    )
}
