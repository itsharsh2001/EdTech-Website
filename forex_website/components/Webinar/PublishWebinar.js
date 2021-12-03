import classes from "./PublishWebinar.module.css";
import Link from 'next/link'
export default function PublishWebinar(props) {
  return (
    <>
      <div className={classes.box}>
          <div>
        <img src="#" alt="" />
          </div>
        <div>
          <h1>
            The four trade chokepoints and their importance in geopolitics
          </h1>
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because...
          </p>
          <input type="text" placeholder="International Trade Relations" />  
          <input type="text" placeholder="CaptionsFile.docx" />  
          <Link href="/webinar/manage-webinars/" >
          <button>PUBLISH NOW</button>
          </Link>
          {/* <button onClick={props.scheduleHandler}>SCHEDULE</button> */}
        </div>
      </div>
    </>
  );
}
