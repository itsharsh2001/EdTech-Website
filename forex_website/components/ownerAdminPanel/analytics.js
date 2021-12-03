import classes from "./analytics.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";


export default function Home() {
  return (
    <InstructorRouter>
      <div className={classes.box}>
        <div className={classes.firstDiv}>
          <img src="/image.jpg" alt="" width="100px" />
          <div className={classes.iconImage}>
            <CloudUploadIcon
              className={classes.icon2}
              style={{
                fill: "#ffffff",
                backgroundColor: "#606060",
                padding: "10px",
                borderRadius: "50px",
              }}
            />
          </div>
          <div className={classes.captionEnglishText}>
            <p>CaptionEnglish.docx</p>
            <CloudUploadIcon style={{ fill: "#ffffff" }} />
          </div>
          <span className={classes.viewsText}>
            <h3>
              251,064<span className={classes.views}>Views</span>
            </h3>
          </span>
          <span className={classes.percentage}>
            <span className={classes.percentage75text}>75%</span>
            <span className={classes.percentageText}>
              Average percentage watched
            </span>
          </span>
        </div>
        <div className={classes.secondDiv}>
          <h3>Lorem Ipsum Video One</h3>
          <h3>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system.
          </h3>
          <select name="" className={classes.select} id="">
            <option value="">Course: Geopolitics & Trade</option>
            <option value="">Course: Geopolitics & Trade</option>
            <option value="">Course: Geopolitics & Trade</option>
          </select>
        </div>
      </div>
    </InstructorRouter>
  );
}
