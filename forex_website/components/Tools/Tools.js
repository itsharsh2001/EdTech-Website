import classes from "./Tools.module.css";
import HomeUI from '../../components/ownerAdminPanel/ui/imagesFileHomeBox.js'
import Link from 'next/link'
// import image1 from '/tools/Artboard22.png'
export default function Tools() {
  return (
    <div className={classes.tools}>
      <h1 className={classes.h1}>Tools</h1>
      {/* <h4 className={classes.h4}>(Welcome, Nikhil)</h4> */}
      <div className={classes.box}>
        <Link href="/tools/forexmarkethours">
          <div>
            <HomeUI
              heading="Forex Market Hours"
              text="Time Zone Converter tool to view forex market hours in your own local time zone"
              isHeading={true}
              image='/tools/forex-market-hours.png'
            />
          </div>
        </Link>

        <Link href="/tools/gainloss">
          <div>
            <HomeUI
              heading="Gain & Loss (%)"
              text="Tells you what percentage of your account balance that you have won or lost"
              isHeading={true}
              image='/tools/gain-loss.png'
            />
          </div>
        </Link>
        <Link href="/tools/pipvalue">
          <div>
            <HomeUI
              heading="Pip Value Calculator"
              text="Help you determine the value per pip in your account currency"
              isHeading={true}
              image='/tools/pip-value.png'
            />
          </div>
        </Link>
        <Link href="/tools/pivotpoint">
          <div>
            <HomeUI
              heading="Pivot Point Calculator"
              text="Determine significant daily, weekly and monthly support and resistance levels"
              isHeading={true}
              image='/tools/pivot-point.png'
            />
          </div>
        </Link>
        <Link href="/tools/positionsize">
          <div>
            <HomeUI
              heading="Position Size Calculator"
              text="Approx. amount of currency units to buy or sell to control your maximum risk per position"
              isHeading={true}
              image='/tools/position-size.png'
            />
          </div>
        </Link>

        <Link href="/tools/forex-regulatory-organisation">
          <div>
            <HomeUI
              heading="Forex Regulatory Org."
              text="Institutions that supervise & control the currency trading and work to protect traders"
              isHeading={true}
              image='/tools/forex-org.png'
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
