import classes from './ChooseCoursesToDisplayAtHomePage.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneIcon from '@mui/icons-material/Done';
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";


export default function ChooseCoursesToDisplayAtHomePage() {
    return (
        <InstructorRouter>
        <div className={classes.choosecoursestodisplayathomepage}>
            <h1>Choose courses to display at homepage</h1>
            <p>Sort by: <span>Date Uploaded</span></p>
            {/* <div className={classes.sideicons}>
                <DeleteForeverIcon/>
                <VisibilityOffIcon/>
            </div> */}
            <button>Save Changes</button>

            <section>
                <div>
                    <img src="./img1.jpg" />
                    <span className={classes.icon}><DoneIcon/></span>
                    <h2>Lorem Ipsum Dolor Course One</h2>
                </div>
                <div>
                    <img src="./img2.jpg" />
                    <span className={classes.icon}></span>
                    <h2>Lorem Ipsum Dolor Course Two</h2>
                </div>
                <div>
                    <img src="./img3.jpg" />
                    <span className={classes.icon}></span>
                    <h2>Lorem Ipsum Dolor Course Three</h2>
                </div>
                <div>
                    <img src="./img4.jpg" />
                    <span className={classes.icon}></span>
                    <h2>Lorem Ipsum Dolor Course Four</h2>
                </div>
                <div>
                    <img src="./img5.jpg" />
                    <span className={classes.icon}></span>
                    <h2>Lorem Ipsum Dolor Course Five</h2>
                </div>
                <div>
                    <img src="./img6.jpg" />
                    <span className={classes.icon}></span>
                    <h2>Lorem Ipsum Dolor Course Six</h2>
                </div>
            </section>
        </div>
        </InstructorRouter>
    )
}
