import classes from './WebinarOverlay.module.css'
import OwnerAdminPanelSuperLayout from '../UI/OwnerAdminPanelSuperLayout'
import LiveOrPreRecordedWebinar from '../Webinar/LiveOrPreRecordedWebinar'
import { useState } from 'react'
import UploadWebinars from './UploadWebinars'
import PublishWebinar from './PublishWebinar'
import ScheduleWebinar from './ScheduleWebinar'

import WebinarAnalytics from './WebinarAnalytics'
export default function OwnerAdminPanelOverlay() {
    const [isUploadPre, setIsUploadPre] = useState(0)

    const yespre = () => {
        setIsUploadPre(1)
    }
    const yeslive = () => {
        setIsUploadPre(2)
    }
const [isPublishWebinar, setIsPublishWebinar] = useState(false)
    const publishwebinaryes = () => {
        setIsUploadPre(4);
        setIsPublishWebinar(true)
    }

    const [isScheduleWebinar, setIsScheduleWebinar] = useState(false)
    const scheduleHandler = () =>{
        setIsScheduleWebinar(true)
    }
    return (

        <div className={classes.overlay}>
            <OwnerAdminPanelSuperLayout>
                {isUploadPre===0 && <LiveOrPreRecordedWebinar yespre={yespre} yeslive={yeslive}/>}
                {isUploadPre===1 && <UploadWebinars publishwebinaryes={publishwebinaryes}/>}
                {isPublishWebinar && <PublishWebinar scheduleHandler={scheduleHandler}/>}
                {/* {isScheduleWebinar && <ScheduleWebinar/>} */}
                {/* <WebinarAnalytics/> */}
            </OwnerAdminPanelSuperLayout>
        </div>
    )
}
