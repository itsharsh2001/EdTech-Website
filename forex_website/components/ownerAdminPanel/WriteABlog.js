import classes from "./WriteABlog.module.css";
import Link from 'next/link'
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function WriteABlog() {
  return (
    <InstructorRouter>
    <div className={classes.writeablog}>
      <h1>Write a blog</h1>
      <form>
        <div>
          <input type="text" placeholder="Blog Heading" />
          <input type="text" placeholder="Blog Sub-heading" />
        </div>

        <textarea cols="30" rows="10" placeholder="Content"></textarea>
        <span>
          <input type="text" placeholder="Tags" />
          <input className={classes.file} type="file" placeholder="Select Cover Image" />
        </span>
        <Link href="/master-admin-panel/blogs/manage-blogs/">
        <button>PROCEED</button>
        </Link>
      </form>
    </div>
    </InstructorRouter>
  );
}
