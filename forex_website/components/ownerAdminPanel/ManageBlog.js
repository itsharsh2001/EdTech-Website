import classes from "./ManageBlog.module.css";
import Link from 'next/link'
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function ManageBlog(props) {
  return (
    <InstructorRouter>
    <div className={classes.manageblog}>
      <h1 className={classes.h1}>Manage Blog</h1>
      <h3 className={classes.h3}>
        You haven&apos;t uploaded anything yet. 
        <Link href="/master-admin-panel/blogs/write-a-blog/" >
         <span
        //   onClick={props.overlayHandler}
          style={{ color: "#0099FF", cursor: "pointer" }}
        >
          Write the blog
        </span></Link> now
      </h3>
    </div>
    </InstructorRouter>
  );
}
