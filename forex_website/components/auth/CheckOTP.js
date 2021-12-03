import InputField from "../UI/InputField";
import WhiteButton from "../UI/WhiteButton";
import classes from "./CheckOTP.module.css";
import { useRouter } from "next/router";
import { useState, useContext, useEffect  } from "react";
import axios from "axios";
import { Context } from "../../context/index";

export default function CheckOTP(props) {
  const Router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState('');

  // state
  const { state, dispatch } = useContext(Context);

  const { otpError,user } = state;

  async function handlerButton() {

    document.getElementById("otpId").style.border = "none"

      dispatch({
        type: "RemoveOtpError",
      });

    setError('')
    const email = localStorage.getItem("email");

    try {
      const { data } = await axios.post(`/api/check-otp`, {
        email: email,
        otp: otp,
      });

      dispatch({
        type: "LOGIN",
        payload: user,
      });

      
      localStorage.removeItem("email")
      localStorage.removeItem("phone");

      localStorage.setItem("user", JSON.stringify(data));
      Router.reload();
    } catch (err) {
      document.getElementById("otpId").style.border = "1px solid red"
      console.log(err)
      const error = err.response.data.message;
      setError(error)
      dispatch({
        type: "MakeOtpError",
        payload: {
          error:error
        },
      });
    }
  }

  async function handlerClick() {
    setError('');
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");

    try {
      const { data } = await axios.post(`/api/resend-otp`, {
        email: email,
        phone: phone,
      });

      setError('Check Your Email For New Otp')
    } catch (err) {
      const error = err.response.data.message;
      setError(error)
    }
  }

  return (
    <div className={classes.checkotp}>
      <h2>We have just sent you an OTP </h2>
      <span></span>

      <InputField>
        <input
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          id="otpId"
          placeholder="Enter OTP"
        />
      </InputField>
      <div>
        <p>{error}</p>
        <a href="#" onClick={handlerClick} style={{color:'#0099ff'}}>
          Resend OTP
        </a>
      </div>
      <WhiteButton>
        <button onClick={handlerButton} type="submit">
          VERIFY
        </button>
      </WhiteButton>
    </div>
  );
}
