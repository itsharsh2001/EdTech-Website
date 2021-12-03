import classes from './OwnerAdminPanelSuperLayout.module.css'

export default function OwnerAdminPanelSuperLayout(props) {
    return (
        <div className={classes.owneradminpanelsuperlayout}>
            {props.children}
        </div>
    )
}