import classes from "./Banner.module.css";
import StarIcon from "@mui/icons-material/Star";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function Banner(props) {
  return (
    <div className={classes.banner}>
      <img src={props.thumbnail} alt="Live Webinar" />
      <section>
        <h1>
          <FiberManualRecordIcon />
          LIVE
        </h1>
        <h2 className={classes.title}>{props.title}</h2>
        <span>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </span>
      </section>
    </div>
  );
}
