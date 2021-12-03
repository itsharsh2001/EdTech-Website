import classes from './HamBurger.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
export default function HamBurger(props) {
    return (
        <nav className={classes.hamburger}>
            <MenuIcon onClick={props.onMenuClick} className={classes.ham}/>
            <Link href="/" >
            <span></span>   
            </Link>         
            <div></div>
        </nav>
    )
}
