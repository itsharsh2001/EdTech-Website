import classes from './InputField.module.css'

export default function InputField(props) {
    return (
        <div className={classes.inputfield}>
            {props.children}
        </div>
    )
}
