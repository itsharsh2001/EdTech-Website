import classes from './OwnerAdminPanelOverlay.module.css'
import OwnerAdminPanelSuperLayout from '../UI/OwnerAdminPanelSuperLayout'
import Upload from '../ownerAdminPanel/upload-a-video'
import UploadInputs from '../ownerAdminPanel/uploadInputs'
import CheckCourse from '../ownerAdminPanel/checkCourse'
import Analytics from '../ownerAdminPanel/analytics'
import NewCoursePlaylist from './newCoursePlaylist'
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";

import { useState } from 'react';
export default function OwnerAdminPanelOverlay() {
    const [isUploadInputs, setIsUploadInputs] = useState(0)
    const [isNewCoursePlaylist, setIsNewCoursePlaylist] = useState(false)
    const [isCheckCourse, setIsCheckCourse] = useState(false)
    const uploadInputsHandler = () => {
        setIsUploadInputs(1)
    }
    const newCoursePlayListHandler = () => {
        setIsNewCoursePlaylist(()=>{return !isNewCoursePlaylist})
        if(isUploadInputs!==2){
            setIsUploadInputs(2)}
        else{
            setIsUploadInputs(1)}
        
    }

    const checkCourseHandler = () => {
        setIsCheckCourse(true)
        setIsUploadInputs(2)
    }

    const backToUploadInputs = () => {
        setIsUploadInputs(1);
        setIsNewCoursePlaylist(false);
    }

    return (
        <InstructorRouter>
        <div className={classes.overlay}>
            <OwnerAdminPanelSuperLayout>
                {isUploadInputs===0 && <Upload uploadInputsHandler={uploadInputsHandler} />}
                {isUploadInputs===1 && <UploadInputs newCoursePlayListHandler={newCoursePlayListHandler} checkCourseHandler={checkCourseHandler} />}
                {isNewCoursePlaylist && <NewCoursePlaylist backToUploadInputs={backToUploadInputs} newCoursePlayListHandler={newCoursePlayListHandler} />}
                {isCheckCourse && <CheckCourse />}
            
              
              
              
                {/* <Analytics/> */}
            </OwnerAdminPanelSuperLayout>
        </div>
        </InstructorRouter>
    )
}
