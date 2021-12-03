import classes from "./AdminNavBar.module.css";
import WhiteButton from "../UI/WhiteButton";
import Link from 'next/link';
import {Context} from '../../context/index'
import {useContext,useState, useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
// import {getCurrentDate} from './utils'
export default function NavBar(props) {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
   let timer = setInterval(()=>setDate(new Date()), 1000)
   return function cleanup(){
     clearInterval(timer)
   }
  });



  const { state, dispatch} = useContext(Context);
  const { user } = state;

  const router = useRouter();
  // let date = new Date().toLocaleString() + '' ;  
const logout = async()=>{
  dispatch({ type: 'logout' });
  localStorage.removeItem('user');
  const { data } = await axios.get('/api/logout');
  router.reload();
}



  return (
    <InstructorRouter>
    <nav id="home" className={classes.nav}>
      {/* <div></div> */}
      <section>
          <h5>Good Morning, Nikhil</h5>
          <p>{date.toLocaleString() + ''}</p>
      </section>
      <Link href="/" >
      <span></span>
      </Link>
      

      <button onClick={logout}>Logout</button>
     {/* {
       user==null && <Link href="/"><button onClick={props.onRegisterClick}>REGISTER/LOGIN</button></Link> 
     }
     {
       user!=null &&  <button onClick={logout}>Logout</button> 
     } */}
    </nav>
    </InstructorRouter>
  );
}
