import classes from "./About3.module.css";

export default function About() {
  return (
    <div className={classes.about}>
      <h1 id="about">WHY FOREX OVER THE STOCK MARKET?</h1>
      <div>
        <span></span>
        <section>
          Low Investment
          <br />
          It lets you control large amounts of money by investing only small
          amounts as forex reduce the risks<p className={classes.blue}> Read More... </p><p className={classes.special}> involved in a profitable investment
          strategy. Forex is the largest and most popular financial market in
          the world, which sees a daily turnover of trillions of dollars. The
          stock market sees comparatively fewer trades per day.
          <br />
          Leverage
          <br />
          Leverage trading enables you to gain exposure to markets with just a
          fraction of the capital normally required. Forex trades usually have a
          much larger leverage ratio, in some countries as much as 200:1. But
          leverage is a double-edged sword: though it can magnify returns.
          <br />
          Time Flexibilty
          <br />
          The Forex trading market operates 24 hours a day and almost seven days
          every week. You don’t have to wait for the opening bell to start
          trading. You can enter and exit a trade whenever you want. Whether you
          are a student, business person, or employee, you can trade part-time.</p>
        </section>
      </div>
    </div>
  );
}
