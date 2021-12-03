import classes from "./RegisterVia.module.css";
import { Context } from "../../context/index";
import { useContext, useEffect } from "react";

export default function RegisterVia() {
  // state
  const { state, dispatch } = useContext(Context);

  const { error } = state;
  useEffect(() => {
    const { error } = state;
  }, [error])


  return (
    <div className={classes.registervia}>
      <h3>Register Via:</h3>
      <section>
        <span></span>
        <span></span>
        <span></span>
        <div></div>
      </section>
      {error.fillError && <p className={classes.p1}>Fill all The Fields</p>}
      {error.nameError && <p className={classes.p1}>Invalid Name</p>}


      {error.emailError && <p className={classes.p3}>Invalid E-Mail Address</p>}

      {error.userRegistered && (
        <p className={classes.p3}>User Already Registered</p>
      )}

      {error.phoneError && <p className={classes.p4}>Invalid Phone Number</p>}
      {error.phoneRegistered && <p className={classes.p4}>User Already Registered</p>}
      {error.passwordError && (
        <p className={classes.p5}>Password Min 6 characters long</p>
      )}
      {error.confirmPasswordError && (
        <p className={classes.p6}>Password Doesn&apos;t Match</p>
      )}
    </div>
  );
}
