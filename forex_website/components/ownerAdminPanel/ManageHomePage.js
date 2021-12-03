import classes from "./ManageHomePage.module.css";
import HomeUI from "./ui/homeBox";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";


export default function ManageHomePage() {
  return (
    <InstructorRouter>
    <div className={classes.managehomepage}>
      <h1>Signals</h1>
      <div className={classes.box}>
        <HomeUI
          heading="Top Courses Visibility"
          text="Manage what to display in the top courses"
          isHeading={true}
        />

        <HomeUI
          heading="Welcome Text"
          text="Edit your welcome text"
          isHeading={true}
        />

        <HomeUI
          heading="Webinars Visibility"
          text="Manage the appearance of webinars on the homepage"
          isHeading={true}
        />
      </div>
    </div>
    </InstructorRouter>
  );
}
