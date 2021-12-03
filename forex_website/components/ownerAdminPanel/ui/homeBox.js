import classes from "./homeBox.module.css";
import { useState } from "react";

export default function HomeUI(props) {
  const [fontOfHeading, setFontOfHeading] = useState(props.isHeading);

  return (
    <>
      <div>
        <div className={classes.box}>
          {/* <span></span> */}
          <img src={props.image} alt="" />
        </div>
        {fontOfHeading ? (
          <h2 className={classes.h2}>{props.heading}</h2>
        ) : (
          <h2
            style={{ fontSize: "22px", lineHeight: "1.2" }}
            className={classes.h2ManageVideos}
          >
            {props.heading}
          </h2>
        )}

        <h3 className={classes.h3}>{props.text}</h3>
      </div>
    </>
  );
}
