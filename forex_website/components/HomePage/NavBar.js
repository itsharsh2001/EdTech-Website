import classes from "./NavBar.module.css";
import WhiteButton from "../UI/WhiteButton";
import Link from "next/link";
import { Context } from "../../context/index";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NavBar(props) {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [instructor, setInstructor] = useState(false);
  const [planName, setPlanName] = useState();
  const router = useRouter();

  const [isLogout, setIsLogout ] = useState(true);
  const selectChangeHandler = () => {
    let e = document.getElementById("planSelect");
    let strUser = e.options[e.selectedIndex].text;
    // setPlanName(strUser);
    if(strUser === 'LogOut'){
      logout();
    }
    else if(strUser === 'ChangePassword'){
      router.push('/account-change-password')
    }
  }

  const logout = async () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    router.reload()
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
    <nav id="home" className={classes.nav}>
      {/* <div></div> */}
      <Link href="/" >
      <span></span>
      </Link>
      <ul>
        {
          props.title == "home"?
        <li className={classes.active}>
          <Link href="/">Home</Link>
        </li>:
        <li>
        <Link href="/">Home</Link>
      </li>
        }

      {
          props.title == "course"?
        <li className={classes.active}>
          <Link href="/Courses">Courses</Link>
        </li>:
        <li>
        <Link href="/Courses">Courses</Link>
      </li>
        }

        <li onClick={about}>
          About
          {/* <div></div> */}
        </li>
        {
          props.title == 'tools'?
          <li className={classes.active}>
          <Link href="/tools">Tools</Link>
        </li>:
         <li>
         <Link href="/tools">Tools</Link>
       </li>
        }
       
        <li>
          <Link href="/">MarketMilk</Link>
        </li>
        <li>
          <Link href="/">Calender</Link>
        </li>
        <li onClick={contact}>
          Contact Us
          {/* <div></div> */}
        </li>
      </ul>
      {isLogout && (
        <Link href="/">
          <button onClick={props.onRegisterClick}>REGISTER/LOGIN</button>
        </Link>
      )}

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
    </nav>
  );
}
