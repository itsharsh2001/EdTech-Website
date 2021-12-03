import classes from "./AccountSettings.module.css";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import axios from "axios";
import { useState,useContext } from "react";
import { useRouter } from 'next/router'
import { Context } from "../../context/index";

export default function AccountSettings() {

  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const [email, setEmail] = useState(null);
  const [error,setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [password, setPassword] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [update, setUpdate] = useState(false)
  const [emailupdate, setEmailUpdate] = useState(false)


  const logout = async () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
  };


  const emailHandler = async () =>{
    setEmailUpdate(true)
    setError('');
    setPasswordError('');
    try{
      const {data} = await axios.post('/api/instructor/change-email',{
        email:email
      })
      logout();
      setError(data.message);
      setTimeout(() =>
      {router.reload()},2000
      )
      setEmailUpdate(false)
      
    }catch(error){
      setEmailUpdate(false)
     const err = error.response.data.message
     setError(err);
    }
   
  }

  const passwordHandler = async () =>{
    setUpdate(true)
    setError('');
    setPasswordError('');
    try{
      const {data} = await axios.post('/api/instructor/change-password',{
        password : password,
        confirmPassword : confirmPassword,
        currentPassword : currentPassword
      })
      setPasswordError(data.message)
      setUpdate(false)
      
    }catch(error){
      setUpdate(false)
     const err = error.response.data.message
     setPasswordError(err);
    }
   
  }
  
  return (
    <InstructorRouter>
    <div className={classes.settings}>
      <section>
        <h1>Account Settings</h1>
        <h2>E-Mail Address:</h2>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter E-mail Address" />
        {
          emailupdate?
          <button onClick={emailHandler} disabled>updating...</button>:
          <button onClick={emailHandler}>Update E-Mail</button>
        }
        
        <p style={{color:'white',fontSize:'22px'}}>{error}</p>
        <h2>Change Password</h2>
        <input type="password" onChange={(e)=>setCurrentPassword(e.target.value)} placeholder="Enter current password" />
        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter new password" />
        <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Re-enter new password" />
        {
          update?<button onClick={passwordHandler} disabled>Updating...</button>:
          <button onClick={passwordHandler}>Update Password</button>
        }
        
        <p style={{color:'white',fontSize:'20px'}}>{passwordError}</p>
        <hr />
      </section>
    </div>
    </InstructorRouter>
  );
}
