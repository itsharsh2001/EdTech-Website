import classes from "./ChangePassword.module.css";
import InputField from "../UI/InputField";
import WhiteButton from "../UI/WhiteButton";
import { useState } from "react";
import UserRouter from "../wrapperForProtectedRoutes/userRoute.js";
import axios from 'axios'

export default function ChangePassword() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [error,setError] = useState('');

  const handlerButton = async() => {

    try{

      const {data} = await axios.post('/api/instructor/change-password',{
        password:password,
        confirmPassword:confirmPassword,
        currentPassword:currentPassword
      })
      setError(data.message)
      

    }catch(error){
      setError(error.response.data.message)
    }
   
  };



  
  return (
    <UserRouter>
    <div className={classes.hereyouare}>
      <h2>Here you are!  Now set a new password</h2>
      <p></p>
      <InputField className={classes.input} >
        <input
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          placeholder="Your Current Password"
        />
      </InputField>
      <InputField className={classes.input} >
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Set a new password"
        />
      </InputField>
      <InputField className={classes.input} >
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Re-enter the password"
        />
      </InputField>
      <WhiteButton className={classes.input}>
        <button onClick={handlerButton} type="submit">
          RESET PASSWORD & LOGIN
        </button>
      </WhiteButton>
      <p className={classes.lowerp}>{error}</p>
    </div>
    </UserRouter>
  );
}
