import classes from "./Register.module.css";
import InputField from "../UI/InputField";
import WhiteButton from "../UI/WhiteButton";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Context } from "../../context";

export default function Register(props) {
  // state
  const { state, dispatch } = useContext(Context);
  const { error } = state;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // errors
  const [fillError, setFillError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [phoneRegistered, setPhoneRegistered] = useState(false);

  async function handlerButton() {

    document.getElementById("nameId").style.border = "none"
    document.getElementById("emailId").style.border = "none"
    document.getElementById("phoneId").style.border = "none"
    document.getElementById("passwordId").style.border = "none"
    document.getElementById("confirmPasswordId").style.border = "none"

    setFillError(false);
    setNameError(false);
    setEmailError(false);
    setPhoneError(false);
    setPasswordError(false);
    setUserRegistered(false);
    setConfirmPassword(false);
    setPhoneRegistered(false)

    try {
      // dispatch({
      //   type: "RemoveError",
      // });

      const { data } = await axios.post(`/api/register`, {
        name: name,
        date: date,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
      });

      localStorage.setItem("email", email);
      localStorage.setItem("phone", phone);

      props.CheckOtpActivate();
    } catch (err) {
      const error = err.response.data.message;

      if (error == "Fill all the Fields") {
        setFillError(true);
        dispatch({
          type: "MakeError",
          payload: {
            fillError: (()=>{return fillError}),
            nameError: false,
            emailError: false,
            phoneError: false,
            passwordError: false,
            confirmPasswordError: false,
            userRegistered: false,
          },
        });
        return;
      }

      if (error == "Invalid Name") {
        document.getElementById("nameId").style.border = "1px solid red"
        setNameError(true);
        dispatch({
          type: "MakeError",
          payload: {
            nameError: (()=>{return nameError}),
            fillError: false,
            emailError: false,
            phoneError: false,
            passwordError: false,
            confirmPasswordError: false,
            userRegistered: false,
          },
        });
        return;
      }

      if (error == "Invalid E-Mail Address") {
        document.getElementById("emailId").style.border = "1px solid red"
        setEmailError(true);
        dispatch({
          type: "MakeError",
          payload: {
            emailError: (()=>{return emailError}),
            fillError: false,
            nameError: false,
            phoneError: false,
            passwordError: false,
            confirmPasswordError: false,
            userRegistered: false,
          },
        });
        return;
      }

      if (error == "User already registered With This Mobile") {
        document.getElementById("phoneId").style.border = "1px solid red"
        setPhoneRegistered(true);
        dispatch({
          type: "MakeError",
          payload: {
            phoneError : false,
            fillError: false,
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            userRegistered: false,
            phoneRegistered: (()=>{return phoneRegistered}),
          },
        });
        return;
      }


      if (error == "Invalid Phone Number") {
        document.getElementById("phoneId").style.border = "1px solid red"
        setPhoneError(true);
        dispatch({
          type: "MakeError",
          payload: {
            phoneError: (()=>{return phoneError}),
            fillError: false,
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            userRegistered: false,
          },
        });
        return;
      }

      if (error == "Password must have atleast 6 characters") {
        document.getElementById("passwordId").style.border = "1px solid red"
        setPasswordError(true);
        dispatch({
          type: "MakeError",
          payload: {
            passwordError: (()=>{return passwordError}),
            fillError: false,
            nameError: false,
            emailError: false,
            phoneError: false,
            confirmPasswordError: false,
            userRegistered: false,
          },
        });
        return;
      }

      if (error == "Password Doesn't match") {
        document.getElementById("confirmPasswordId").style.border = "1px solid red"
        setConfirmPasswordError(true);
        dispatch({
          type: "MakeError",
          payload: {
            confirmPasswordError: (()=>{return confirmPasswordError}),
            fillError: false,
            nameError: false,
            emailError: false,
            phoneError: false,
            passwordError: false,
            userRegistered: false,
          },
        });
        return;
      }

      if (error == "User already registered") {
        document.getElementById("emailId").style.border = "1px solid red"
        setUserRegistered(true);
        dispatch({
          type: "MakeError",
          payload: {
            userRegistered: (()=>{return userRegistered}),
            fillError: false,
            nameError: false,
            emailError: false,
            phoneError: false,
            passwordError: false,
            confirmPasswordError: false,
          },
        });
        return;
      }
    }
  }

  const onfocus = (e) => {
    e.currentTarget.type = "date";
  };
  const onblur = (e) => {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Enter a Date";
  };

  return (
    <div className={classes.register}>
      <h3>New here? Get started below:</h3>
      <h2>Register</h2>
      <div>
        <InputField>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="nameId"
            placeholder="Full Name"
          />
        </InputField>
        {fillError ? <p className={classes.p1}>Fill all the Fields</p> : null}
        {nameError ? <p className={classes.p1}>Invalid Name</p> : null}
      </div>
      <div>
        <InputField>
          <input
            type="text"
            placeholder="Date of Birth"
            onChange={(e) => setDate(e.target.value)}
            onFocus={onfocus}
            onBlur={onblur}
          />
        </InputField>
        {/* <p className={classes.p2}></p> */}
      </div>
      <div>
        <InputField>
          <input
            type="email"
            id="emailId"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E Mail Address"
          />
        </InputField>
        {emailError ? (
          <p className={classes.p1}>Invalid E-Mail Address</p>
        ) : null}
        {userRegistered ? (
          <p className={classes.p1}>User already registered</p>
        ) : null}
      </div>
      <div>
        <InputField>
          <input
            type="number"
            id="phoneId"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </InputField>
        {phoneError ? <p className={classes.p1}>Invalid Phone Number</p> : null}
        {phoneRegistered ? (
          <p className={classes.p1}>User already registered</p>
        ) : null}
      </div>
      <div>
        <InputField>
          <input
            type="password"
            id="passwordId"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </InputField>

        {passwordError ? (
          <p className={classes.p1}>Password Min 6 characters long</p>
        ) : null}
      </div>
      <div>
        <InputField>
          <input
            type="password"
            id="confirmPasswordId"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter Password"
          />
        </InputField>

        {confirmPasswordError ? (
          <p className={classes.p1}>Password Doesn&apos;t Match</p>
        ) : null}
      </div>
      <WhiteButton>
        {/* <Link href="/"> */}
        <button onClick={handlerButton} type="submit">
          GET OTP & PROCEED
        </button>
        {/* </Link> */}
      </WhiteButton>
    </div>
  );
}
