import classes from "./ManageGeneralInfo.module.css";
import HomeUI from "./ui/homeBox";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function ManageGeneralInfo() {
  return (
    <InstructorRouter>
    <div className={classes.managegeneralinfo}>
      <h1>Manage General Information</h1>
      <div className={classes.box}>
        <HomeUI
          heading="Home"
          text="Manage contents and appearance of the homepage"
          isHeading={true}
        />

        <HomeUI
          heading="Contact Us"
          text="Edit your contact information"
          isHeading={true}
        />
      </div>
    </div>
    </InstructorRouter>
  );
}
