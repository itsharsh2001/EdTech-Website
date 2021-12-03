import classes from "./About2.module.css";

export default function About() {
  return (
    <div className={classes.about}>
      <h1 id="about">
      WHY US?
      </h1>
      <div>
        <span></span>
        <section>
        We are not selling video lectures but values containing core principles combined with our team expertise to maximize your profit. <p className={classes.blue}> Read More... </p><p className={classes.special}>
        <br/>
        <br/>
        Our team of experienced professionals invested their 1,620 hours to develop a 16 hours comprehensive course JUST FOR YOU. The course is designed in such a manner that it suits all tiers of forex traders, either you are a beginner or a pro. The outline of the course is divided into three modules of BASIC, MIDWAY and ADVANCE</p>
        </section>
      </div>
    </div>
  );
}
