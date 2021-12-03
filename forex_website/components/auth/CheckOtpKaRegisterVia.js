import classes from './CheckOtpKaRegisterVia.module.css'
import axios from 'axios'
import { Context } from "../../context/index";
import { useContext, useEffect } from "react";

export default function CheckOtpKaRegisterVia() {

    const { state, dispatch } = useContext(Context);

    const { otpError } = state;

    async function handlerClick() {

    
        dispatch({
            type: "RemoveOtpError",
          });

        const email =  localStorage.getItem('email');
        const phone =  localStorage.getItem('phone');
         try {
             const { data } = await axios.post(`/api/resend-otp`, {
                 email:email,
                 phone:phone
             })
     
             console.log('check your mail')
       
           } catch (err) {
       
             dispatch({
                type: "MakeOtpError",
                payload: {
                error:err.response.data.message
                },
      });
             
           }
     
         }


    return (
        <div className={classes.checkotpkaregistervia}>
            <h3>Register Via:</h3>
            <section>
                <span></span>
                <span></span>
                <span></span>
                <div></div>
            </section>
           <p>{otpError.error}</p>
           <a href="#" onClick={handlerClick} style={{color:'#0099ff'}}>Resend OTP</a>
        </div>
    )
}
