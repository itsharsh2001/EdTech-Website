import HomeUI from "./ui/homeBox";
import classes from "./adminHome.module.css";
import Link from "next/link";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function Home() {
  return (
    <InstructorRouter>
      <div className={classes.homepage} >
        <h1 className={classes.h1}>Administrator&apos;s Dashboard</h1>
        <h4 className={classes.h4}>(Welcome, Nikhil)</h4>
        <div className={classes.box}>
          <Link href="/master-admin-panel/Manage-videos/manage">
            <div>
              <HomeUI
                heading="Courses"
                text="Upload videos for courses, manage videos, get analytics, etc."
                isHeading={true}
                image='/allabootaicons/admindashboard/courses.png'
              />
            </div>
          </Link>

          {/* <Link href="/master-admin-panel/blogs/manage">
          <div>
            <HomeUI
              heading="Blogs"
              text="Write a new one, edit old ones, get analytics, etc."
              isHeading={true}
            />
          </div>
        </Link> */}

          {/* <HomeUI
          heading="General Info"
          text="Edit content of the desired webpages."
          isHeading={true}
        /> */}
          <Link href="/webinar/manage" >
            <div>

              <HomeUI
                heading="Webinar"
                text="Premier a webinar, host a live webinar, manage previous ones, get analytics."
                isHeading={true}
                image='/allabootaicons/admindashboard/webinaricon.png'
              />
            </div>
          </Link>
          <Link href="/users-database/">
            <div>
              <HomeUI
                heading="Users' Databse"
                text="Get users' email, phone, courses bought, etc."
                isHeading={true}
                image='/allabootaicons/admindashboard/udbicon.png'
              />
            </div>
          </Link>
          <Link href="/master-admin-panel/account-settings/">
            <div>
              <HomeUI
                heading="Account Settings"
                text="Manage account, security, lorem ipsum dolor, etc."
                isHeading={true}
                image='/allabootaicons/admindashboard/settingsicon.png'
              />
            </div>
          </Link>
          <Link href="/master-admin-panel/requests/">
            <div>
              <HomeUI
                heading="Requests"
                text="View user queries and requests,"
                isHeading={true}
                image='/allabootaicons/admindashboard/requests.png'
              />
            </div>
          </Link>

          <Link href="/master-admin-panel/signals/">
            <div>
              <HomeUI
                heading="Signals"
                text="Manage info of the signals page"
                isHeading={true}
                image='/allabootaicons/admindashboard/signalsico.png'
              />
            </div>
          </Link>
          {/* <HomeUI
          heading="Daily Market Analysis"
          text="In-depth analysis of day-to-day market behaviour."
          isHeading={true}
        /> */}
        </div>
      </div>
    </InstructorRouter>
  );
}
