// import classes from './WebinarOverlay.module.css'
import OwnerAdminPanelSuperLayout from '../UI/OwnerAdminPanelSuperLayout'
// import LiveOrPreRecordedWebinar from '../Webinar/LiveOrPreRecordedWebinar'\
import Uploading from '../ownerAdminPanel/Uploading'
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

export default function OwnerAdminPanelOverlay() {
    return (
        <InstructorRouter>
        <div>
            <OwnerAdminPanelSuperLayout>
                <Uploading/>
            </OwnerAdminPanelSuperLayout>
        </div>
        </InstructorRouter>
    )
}
