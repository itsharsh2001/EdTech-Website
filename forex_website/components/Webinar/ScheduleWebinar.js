import classes from './ScheduleWebinar.module.css'

export default function ScheduleWebinar() {
    return (
        <div className={classes.schedule}>
            <h2>Schedule Webinar</h2>
            <h3>Set Date & Time</h3>
            <div>
                <section>
                    <p>August</p>
                    <h1>15</h1>
                    <p>2022</p>
                </section>
                <section>
                    <h1 style={{marginTop:"70px"}}>16:45</h1>
                </section>
            </div>
            <button>FINALIZE</button>
        </div>
    )
}
