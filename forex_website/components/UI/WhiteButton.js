import classes from './WhiteButton.module.css'

export default function WhiteButton(props) {
    return (
        <div className={classes.whitebutton}>
            {props.children}            
        </div>
    )
}
