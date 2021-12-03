import classes from './PaidOrFree.module.css'

export default function PaidOrFree() {
    return (
        <div className={classes.box} >
            <h1>This is a paid webinar, please <span> LOG IN</span> or <span>REGISTER</span> to continue.</h1>
        </div>
    )
}
