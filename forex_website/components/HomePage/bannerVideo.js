import classes from "./bannerVideo.module.css";

export default function Banner() {

  return (
    <>
 
      <video className={classes.video} autoPlay muted loop>
      <source src="https://bannervideoaboota.s3.ap-south-1.amazonaws.com/aboota+banner+BIG+logo.mp4" type="video/mp4"/>
    </video>
    </>
  );
}
