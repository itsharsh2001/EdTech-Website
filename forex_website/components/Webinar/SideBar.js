import classes from "./SideBar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import SendIcon from '@mui/icons-material/Send';

export default function SideBar(props) {
  return (
    <div className={classes.sidebar}>
      <CloseIcon onClick={props.onClose} className={classes.close} />
      <h3>Webinar Chat</h3>
      <section className={classes.section}>
        <span>
          <div>
            <CircleIcon />
            <h4>John Appleseed</h4>
          </div>
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure.
          </p>
        </span>
        <span>
          <div>
            <CircleIcon />
            <h4>John Appleseed</h4>
          </div>
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure.
          </p>
        </span>
        <span>
          <div>
            <CircleIcon />
            <h4>John Appleseed</h4>
          </div>
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure.
          </p>
        </span>
        <span>
          <div>
            <CircleIcon />
            <h4>John Appleseed</h4>
          </div>
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure.
          </p>
        </span>
      </section>

      <p className={classes.para}><CircleIcon className={classes.paradot}/><CircleIcon className={classes.paradot}/><CircleIcon className={classes.paradot}/>Jon AppleSeed is typing ...</p>

      <div className={classes.input}>
        <input type="text" placeholder="Type your message here" />
        <span><SendIcon/></span>
      </div>  
    </div>
  );
}
