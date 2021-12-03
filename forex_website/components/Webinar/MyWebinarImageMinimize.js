import classes from './MyWebinarImageMinimize.module.css'
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';

export default function MyWebinarImageMinimize() {
    return (
        <div className={classes.mywebinarimageminimize}>
            <section>
                <span><VideocamIcon className={classes.icon}/></span>
                <span><MicIcon className={classes.icon}/></span>
            </section>
            <button>Join Now</button>
        </div>
    )
}
