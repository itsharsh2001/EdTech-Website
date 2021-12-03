import InputField from '../UI/InputField'
import WhiteButton from '../UI/WhiteButton'
import classes from './HereYouAre.module.css'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { useState, useContext, useEffect  } from "react";
import { Context } from "../../context/index";
import { useRouter } from "next/router";

export default function HereYouAre(props) {
  const Router = useRouter();


  const email = localStorage.getItem('email');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // state
  const { state, dispatch } = useContext(Context);

  const {user } = state;


  async function handlerButton() {
    setError(false)
    try {
      const { data } = await axios.post(`/api/update-password`, {
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });
      localStorage.removeItem('email');
      dispatch({
        type: "LOGIN",
        payload: user,
      });
      localStorage.setItem("user", JSON.stringify(data));
      Router.reload();
    } catch (err) {
      const error = err.response.data.message;
      setError(error)
    }
  }

  return (<>
    <CloseIcon onClick={props.onClose}  style={{color:'white'}} className={classes.closeicon} />
    <div className={classes.hereyouare}>
      <h2>Here you are! Now set a new password</h2>
      <p>(And don&apos;t forget it next time)</p>
      {/* <div> */}

      <InputField>
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Set a new password" id="enterIdPassword"/></InputField>
      {/* </div> */}
      {/* <div> */}

      <InputField>
        <input 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        type="password" 
        placeholder="Re-enter the password"
        id="reEnterPasswordId"
        /></InputField>
      {/* </div> */}
      {/* <div> */}

      <WhiteButton>
        <button onClick={handlerButton} type="submit">RESET PASSWORD & LOGIN</button>
      </WhiteButton>
      {/* </div> */}
      <p className={classes.lowerp}>{error}</p>
    </div>
  </>
  )
}
