import classes from "./Sidebar.module.css";
import WhiteButton from "../UI/WhiteButton";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { Context } from "../../context/index";
import {useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SideBar(props) {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [instructor, setInstructor] = useState(false);
  const [isLogout, setIsLogout ] = useState(true);

  const router = useRouter();

  const selectChangeHandler = (e) => {
    if(e.target.value === 'LogOut'){
      logout();
    }
    else if(e.target.value === 'ChangePassword'){
      router.push('/account-change-password')
    }
  }

  const logout = async () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    router.reload();
  };

  const checkingInstructor = async()=>{
    const { user } = state;

    if (user) {
      setIsLogout(false)
      const { data } = await axios.get("/api/instructor");
      console.log(data);
      setInstructor(data.instructor);
    }
  }

  useEffect(() => {
    checkingInstructor()
  }, [user]);

  const about = ()=>{
    router.replace('/#about')
  }


  const contact = ()=>{
    router.replace('/#contact')
  }

  return (
    <div className={classes.sidebar}>
      <div>
      <Link href="/" >
        <span></span>
        </Link>
        <CloseIcon onClick={props.onCloseClick} className={classes.close} />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Courses">Courses</Link>
        </li>
        <li onClick={about}>
          About
        </li>
        <li>
          <Link href="/tools">Tools</Link>
        </li>
        <li>
          <Link href="/">MarketMilk</Link>
        </li>
        <li>
          <Link href="/">Calender</Link>
        </li>
        <li onClick={contact}>
          Contact Us
        </li>
      </ul>
      <WhiteButton>
        {isLogout && (
          <Link href="/">
            <button onClick={props.onRegisterClick}>REGISTER/LOGIN</button>
          </Link>
        )}
        {/* {user != null && <button onClick={logout}>Logout</button>} */}
        {!isLogout && !instructor && 
      <select id="planSelect" onChange={selectChangeHandler}>
        <option value="Hello">Hello {user.user.name}!</option>
        <option value="LogOut">LogOut</option>
        <option value="ChangePassword">ChangePassword</option>
      </select>
      }

      {!isLogout && instructor && (
          <Link href="/master-admin-panel/home-Page-Admin">
        <button style={{color:'black'}}>
         Admin Panel 
        </button>
        </Link>
      )}

      </WhiteButton>
    </div>
  );
}
