import classes from './SignUpLayout.module.css'

export default function SignUpLayout(props) {
    // const variable = (window.innerHeight - 600)/2
    return (
        <div className={classes.signuplayout}>
            {props.children}
        </div>
    )
}
