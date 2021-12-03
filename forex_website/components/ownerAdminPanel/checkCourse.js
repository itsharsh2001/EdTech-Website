import classes from "./checkCourse.module.css";
import Link from "next/link";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function Home() {
  return (
    <InstructorRouter>
      <div className={classes.box}>
        <img src="/image.jpg" alt="" />
        <div>
          <h1>
            The four trade chokepoints and their importance in geopolitics
          </h1>
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because...
          </p>
          <h3>International Trade Relations</h3>
          <h3>CaptionsFile.docx</h3>
          <Link href="/master-admin-panel/Manage-videos/dataUploaded">
            <button>FINALIZE</button>
          </Link>
        </div>
      </div>
    </InstructorRouter>
  );
}
