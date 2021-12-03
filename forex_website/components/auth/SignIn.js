import InputField from "../UI/InputField";
import WhiteButton from "../UI/WhiteButton";
import classes from "./SignIn.module.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context";
import { useRouter } from "next/router";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import CloseIcon from '@mui/icons-material/Close';

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [isPhoneNumberSubmitted, setisPhoneNumberSubmitted] = useState(false)
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [isEmailToPhoneInput, setIsEmailToPhoneInput] = useState(false);

  const phoneButtonHandler = () => {
    document.getElementById('emailorphone').placeholder = 'Enter Phone Number'
    document.getElementById('emailorphone').type = 'number'
    // document.getElementById('submitbutton').innerText = 'SUBMIT'
    document.getElementById('password').style.display = 'none';
    document.getElementById('forgetPassword').style.display = 'none';
    setIsEmailToPhoneInput(true)
  }



  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();




  async function forgetPasswordHandler() {
    setError(false);
    setVerifyEmail(false)

    if (!email) {
      setError('Enter Your Email')
      return;
    } else {
      setError(false);
    }

    try {
      const { data } = await axios.post(`/api/forgot-password`, {
        email: email,
      });
      localStorage.setItem("email", email);
      props.pathSetter('forgot-credentials')
      props.getOTPActivate()
    } catch (err) {
      const error = err.response.data.message;

      setError(error);

    }
  }

  const verifyEmailFromLogin = async () => {
    setError('');
    setVerifyEmail(false)

    localStorage.setItem("email", email);

    try {
      const { data } = await axios.post(`/api/resend-otp`, {
        email: email,
      });

      props.onSignInToCheckOtp();

    } catch (err) {
      const error = err.response.data.message;
      setError(error)
    }

  }


  const handlerButton1 = async () => {
    setError('');
    setVerifyEmail(false)
    localStorage.setItem("email", email);
    try {
      const { data } = await axios.post(`/api/mobile/log-in`, {
        phone: email,
      });
      props.pathSetter('mobile log-in')
      props.getOTPActivate();

    } catch (err) {
      const error = err.response.data.message;
      setError(error)
    }

  }


  async function handlerButton() {
    setVerifyEmail(false)
    setError('');

    try {
      const { data } = await axios.post(`/api/login`, {
        email: email,
        password: password,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      props.onClose();
      router.reload();
    } catch (err) {
      const error = err.response.data.message;

      if (error == 'Please verify your email') {
        setVerifyEmail(true);
      }
      else {
        setError(error);
      }
    }
  }

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
      const error = err
      setError(error)
    }
  };

  const responseFailureGoogle = (error) => {
    console.log(error);
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

  return (<>
    <CloseIcon onClick={props.onClose} style={{color:'white'}} className={classes.closeicon} />
    <div className={classes.signin}>
      <h3>Already a user?</h3>
      <h2>Sign In</h2>
      {!isPhoneNumberSubmitted && <InputField>
        <input
          id="emailorphone"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="E Mail"
        />
      </InputField>}
      {isPhoneNumberSubmitted && <InputField>
        <input
          id="otpinputfield"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="OTP"
        />
      </InputField>}
      <InputField>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </InputField>
      <div className={classes.button}>
        {!isEmailToPhoneInput && <WhiteButton>
          <button id='submitbutton' onClick={handlerButton} type="submit">
            LOGIN
          </button>
        </WhiteButton>}
        {isEmailToPhoneInput && !isPhoneNumberSubmitted && <WhiteButton>
          <button id='phonesubmitbutton' onClick={handlerButton1} type="submit">
            LOGIN
          </button>
        </WhiteButton>}
        {isPhoneNumberSubmitted && <WhiteButton>
          <button id='otpsubmitbutton' type="submit">
            LOGIN
          </button>
        </WhiteButton>}
        <p>{error}</p>
        {verifyEmail ?
          <p className={classes.link} >Please <span onClick={verifyEmailFromLogin}> Verify </span>  Your Email </p> : null
        }

      </div>
      <a id="forgetPassword" onClick={forgetPasswordHandler}>Forgot Credentials?</a>
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
        <span onClick={phoneButtonHandler}></span>
        <span></span>
      </section>
    </div>
  </>
  );
}
