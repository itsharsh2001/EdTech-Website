import classes from "./LiveOrPreRecordedWebinar.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Link from "next/link";
export default function LiveOrPreRecordedWebinar(props) {
  return (
    <div className={classes.box}>
      <div className={classes.first} onClick={props.yespre}>
        <div className={classes.icon}>
          <input type="file" className={classes.inputFile} name="" id="file" />
          <label htmlFor="file">
            <CloudUploadIcon
              className={classes.iconc}
              style={{ fill: "white", fontSize: "90px", alignItems: "center" }}
            />
          </label>
        </div>
        <p className={classes.uploadFileContent}>
          Upload a pre-recorded webinar
        </p>
      </div>

      <Link href="/webinar/start-webinar/">
        <div
        // onClick={props.yeslive}
        >
          <div className={classes.icon}>
            <input
              type="file"
              className={classes.inputFile}
              name=""
              id="file"
            />
            <label htmlFor="file">
              <CloudUploadIcon
                className={classes.iconc}
                style={{
                  fill: "white",
                  fontSize: "90px",
                  alignItems: "center",
                }}
              />
            </label>
          </div>
          <p className={classes.uploadFileContent}>Start a LIVE webinar</p>
        </div>
      </Link>
    </div>
  );
}
