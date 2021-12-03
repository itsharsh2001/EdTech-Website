import classes from './ManageSignals.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneIcon from '@mui/icons-material/Done';
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function ManageSignals() {
    return (
        <InstructorRouter>
        <div className={classes.managesignals}>
            <h1>Manage Signals</h1>
            <p>Sort by: <span>Date Uploaded</span></p>
            <div className={classes.sideicons}>
                <DeleteForeverIcon/>
                <VisibilityOffIcon/>
            </div>
            <button className={classes.firstbutton}>Save Changes</button>
            <button className={classes.secondbutton} >Upload Signal</button>

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
