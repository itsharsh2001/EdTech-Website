import SignUpLayout from '../UI/SignUpLayout'
import Register from '../auth/Register'
import RegisterVia from '../auth/RegisterVia'
import SignIn from '../auth/SignIn'
import SignUpSuperLayout from '../UI/SignUpSuperLayout'
import classes from './SignUp.module.css'
import CheckOTP from '../auth/CheckOTP'
import CheckOtpKaRegisterVia from '../auth/CheckOtpKaRegisterVia'
import GetOTP from '../auth/GetOTP'
import HereYouAre from '../auth/HereYouAre'
import { useState} from 'react'


export default function SignUp(props) {
    const [getOtp, setGetOtp] = useState(false)
    const [hereYouAre, setHereYouAre] = useState(false)
    const [checkOtp, setCheckOtp] = useState(false)
    const [signInToCheckOtp, setSignInToCheckOtp] = useState(false);
    const [path, setPath] = useState('');

     

    const pathSetter = (Path) => {
        setPath(Path);
    }

    const onSignInToCheckOtp = ()=>{
        setSignInToCheckOtp(true);
    }

    const [errorState, setErrorState] = useState({
        fillError: false,
        nameError: false,
        emailError: false,
        phoneError: false,
        passwordError: false,
        confirmPasswordError: false,
        userRegistered: false,
    })

    const errorHandler = (fillError,nameError,emailError,phoneError,passwordError,confirmPasswordError,userRegistered) => {
        setErrorState({fillError: fillError,
        nameError: nameError,
        emailError: emailError,
        phoneError: phoneError,
        passwordError: passwordError,
        confirmPasswordError: confirmPasswordError,
        userRegistered: userRegistered})
    }




    const getOTPActivater = () => {
        setGetOtp(true);
    }
    const hereYouAreActivater = () => {
        setHereYouAre(true);
    }
    const checkOtpActivator = () => {
        setCheckOtp(true);
    }
    return (
        <div className={classes.signup}>
        <SignUpSuperLayout>
            <SignUpLayout>
                {(!checkOtp && !signInToCheckOtp) && <Register onDetailSubmit={errorHandler} CheckOtpActivate={checkOtpActivator} />}
                {(checkOtp || signInToCheckOtp) && <CheckOTP onClose={props.onClose} />}
                {/* <CheckOTP /> */}
                {(!checkOtp && !signInToCheckOtp) && <RegisterVia errorData={errorState} />}
                {(checkOtp || signInToCheckOtp) && <CheckOtpKaRegisterVia/>}
                {/* <CheckOtpKaRegisterVia/> */}
                {!getOtp && <SignIn pathSetter={pathSetter} onSignInToCheckOtp={onSignInToCheckOtp} onClose={props.onClose} getOTPActivate={getOTPActivater} />}
                {getOtp && !hereYouAre && <GetOTP konsaPath={path} onClose={props.onClose} hereYouAreActivate={hereYouAreActivater}/>}
                {hereYouAre && <HereYouAre onClose={props.onClose} />}
            </SignUpLayout>
        </SignUpSuperLayout>
        </div>
    )
}
