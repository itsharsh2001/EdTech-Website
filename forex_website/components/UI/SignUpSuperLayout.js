import classes from './SignUpSuperLayout.module.css'

export default function SignUpSuperLayout(props) {
    return (
        <div className={classes.signupsuperlayout}>
            {props.children}
        </div>
    )
}