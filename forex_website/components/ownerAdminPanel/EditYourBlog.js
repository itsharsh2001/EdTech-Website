import classes from "./EditYourBlog.module.css";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function EditYourBlog() {
  return (
    <InstructorRouter>
    <div className={classes.edityourblog}>
      <h1>Write a blog</h1>
      <form>
        <div>
          <input type="text" placeholder="The four trade chokepoints and their importance in geo..." />
          <input type="text" placeholder="But I must explain to you how all this mistaken idea of..." />
        </div>

        <textarea cols="30" rows="10" placeholder="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs."></textarea>
        <span>
          <input type="text" placeholder="Forex, Trade, Investing, Share Market, Integral Calculus" />
          <input className={classes.file} type="file" placeholder="CoverImage.jpg" />
        </span>
        <button>PROCEED</button>
      </form>
    </div>
    </InstructorRouter>
  );
}
