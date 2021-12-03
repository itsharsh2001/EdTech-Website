import InputField from "../UI/InputField";
import WhiteButton from "../UI/WhiteButton";
import classes from "./GetOTP.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext } from 'react'
import axios from 'axios'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Context } from "../../context";
import { useRouter } from "next/router";

export default function GetOTP(props) {


  const email = localStorage.getItem("email");

  const [error, setError] = useState('');
  const [otp, setOtp] = useState('')

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();


  const responseSuccessGoogle = async (response) => {
    const result = response?.profileObj; // ?. ek asa operator hai jo error thorw nahi krega just undefined de dega

    try {
      setVerifyEmail(false)
      setError('')
      const { data } = await axios.post("/api/google/log-in", {
        email: result.email,
        name: result.givenName,
        token: response.tokenId,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      router.reload();
    } catch (err) {
      const error = err.response.data.message
      setError(error)
    }
  };

  const phoneButtonHandler = () => {
    document.getElementById('emailorphone').placeholder = 'Enter Phone Number'
    document.getElementById('emailorphone').type = 'number'
    // document.getElementById('submitbutton').innerText = 'SUBMIT'
    document.getElementById('password').style.display = 'none'
    setIsEmailToPhoneInput(true)
  }


  const responseFailureGoogle = (error) => {
    // console.log(error);
  };

  const responseFacebook = async (response) => {
    setError('');
    setVerifyEmail(false)
    try {
      const { data } = await axios.post("/api/facebook/log-in", {
        accessToken: response.accessToken,
        userID: response.userID,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      router.reload();
    } catch (err) {
      const error = err.response.data.message;
      setError(error);
    }
  };


  async function handlerButton() {
    
    document.getElementById("otpId").style.border = "none"
    setError(false)
    try {
      const { data } = await axios.post(`/api/check-otp`, {
        email: email,
        otp: otp,
      });

      props.hereYouAreActivate();
    } catch (err) {
      
    document.getElementById("otpId").style.border = "1px solid red"
      const error = err.response.data.message;
      setError(error)
    }
  }

  async function handlerButton1() {
    
    document.getElementById("otpId").style.border = "none"
    setError(false)
    try {
      const { data } = await axios.post(`/api/mobile/log-in/checkOtp`, {
        phone: email,
        otp: otp,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      router.reload();

      props.onClose();
    } catch (err) {
      
    document.getElementById("otpId").style.border = "1px solid red"
      const error = err.response.data.message;
      setError(error)
    }
  }


  async function handlerClick() {
    setError('');
    try {
      const { data } = await axios.post(`/api/resend-otp-forgot-password`, {
        email: email,
      });

      setError(data.message);
    } catch (err) {
      const error = err.response.data.message;
      setError(error);
    }
  }

  const handlerClick1 = async () => {
    setError('');
    try {
      const { data } = await axios.post(`/api/resend-otp-mobile`, {
        phone: email,
      });

      setError(data.message);
    } catch (err) {
      const error = err.response.data.message;
      setError(error);
    }
  }

  return (
    <>
      <CloseIcon onClick={props.onClose}  style={{color:'white'}} className={classes.closeicon} />
      <div className={classes.getotp}>
        <h2>Don&apos;t worry, you&apos;ll be in very soon...</h2>
        <p>
          An OTP was sent to <a>{email}</a>
        </p>
        <InputField>
          <input 
          onChange={(e) => setOtp(e.target.value)} 
          type="number" 
          placeholder="Enter OTP"
          id="otpId" />
        </InputField>
        {props.konsaPath == 'forgot-credentials' && <WhiteButton>
          <button id="forgotcredentialvalabuttton" onClick={handlerButton} type="submit">
            ENTER OTP
          </button>
        </WhiteButton>}
        {props.konsaPath == 'mobile log-in' && <WhiteButton>
          <button id="loginvalabuttton" onClick={handlerButton1} type="submit">
            ENTER OTP
          </button>
        </WhiteButton>}
        {
          props.konsaPath == 'mobile log-in' && <p onClick={handlerClick1} className={classes.lowerp} style={{color:'#0099ff'}}>Resend OTP</p>
        }
        {
          props.konsaPath == 'forgot-credentials' && <p onClick={handlerClick} className={classes.lowerp} style={{color:'#0099ff'}}>Resend OTP</p>
        }


        <p>{error}</p>
        <h2 className={classes.lowerh2}>OR</h2>
        <h3 className={classes.lowerh3}>Sign In via:</h3>
        <section>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_FRONTEND_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <span onClick={renderProps.onClick}></span>
            )}
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FRONTEND_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <span onClick={renderProps.onClick}></span>
            )}
          />
          {/* <span onClick={phoneButtonHandler}></span> */}
          <span></span>
          <span></span>
        </section>
      </div>
    </>
  );
}
