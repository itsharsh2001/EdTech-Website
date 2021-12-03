import classes from "./About.module.css";

export default function About() {
  return (
    <>
    <div id="about" className={classes.content}>
    <img className={classes.image1} src="/imagesforhome/image1.png" alt="" />
    {/* <img className={classes.image2} src="/imagesforhome/img2.png" alt="" />
    <img className={classes.image3} src="/imagesforhome/img3.png" alt="" /> */}
    </div>
    </>
  );
}
