import classes from './EditYourContactDetails.module.css'
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function EditYourContactDetails() {
    return (
        <InstructorRouter>
        <div className={classes.edityourcontactdetails}>
            <h1>Edit your contact details</h1>

            <h3>Address:</h3>
            <div>
                <input type="text" placeholder="Address 12, Street Name, Locality, City Name, State - 100123" />
                <button></button>
            </div>

            
            <h3>E Mail Address:</h3>
            <div>
                <input type="text" placeholder="mail@aboota.in" />
                <button></button>
            </div>
            <div>
                <button></button>
                <input type="text" placeholder="info@aboota.io" />
                <button></button>
            </div>


            <h3>E Mail Address:</h3>
            <div>
                <input type="text" placeholder="mail@aboota.in" />
                <button></button>
            </div>
            <div>
                <button></button>
                <input type="text" placeholder="info@aboota.io" />
                <button></button>
            </div>
        </div>
        </InstructorRouter>
    )
}
