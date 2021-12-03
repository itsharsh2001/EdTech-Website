import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios'
import {useRouter} from 'next/router'

// initial state
const initialState = {
    user: null,
    error:{
        fillError:false,
        nameError:false,
        emailError:false,
        phoneError:false,
        passwordError:false,
        confirmPasswordError:false,
        userRegistered:false,
        phoneRegistered:false
    },
    otpError:{
        error:''
    }
};

// create context
const Context = createContext();

// root reducer 
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        case "MakeError":
            return { ...state, error: action.payload };
        case "RemoveError":
            return { ...state, error: {
                fillError:false,
                nameError:false,
                emailError:false,
                phoneError:false,
                passwordError:false,
                confirmPasswordError:false,
                userRegistered:false
            } };
        case "MakeOtpError":
            return { ...state, otpError: action.payload };
        case "RemoveOtpError":
            return { ...state, otpError: {error:''} };
        default:
            return state;
    }
};

// context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const router = useRouter();

    const checkCurrentUser = async()=>{
        try{
            const {data} = await axios.get('/api/current-user');
            if (!data.message){
                router.push('/')
            }
        }catch(err){
            router.push('/')
        }
    }

    useEffect(async()=>{
        checkCurrentUser();
                
        dispatch({
            type: 'LOGIN',
            payload:JSON.parse(localStorage.getItem('user'))
        })
    },[])

    axios.interceptors.response.use(
        function(response){
            // if anything lies with in status 200 then it will trigger
            return response;
        },
        function(error){
            // outside the range of status 200  so it will trigger
            let res = error.response;
            if(res.status == 401 && res.config && !res.config.__isRetryRequest){
                return new Promise((resolve, reject)=>{
                    axios.get('/api/logout').then((data) => {
                        // console.log('/401 error > logout')
                        dispatch({type: 'LOGOUT'})
                        localStorage.removeItem('user');
                        router.push('/')
                    }).catch(err =>{
                        console.log('AXIOS INTERCEPTORS ERR',err);
                        reject(error)
                    })
                })
            }
            return Promise.reject(error);
        }
        )

        useEffect(() => {

            const getCsrfToken = async () =>{
                const {data} = await axios.get('/api/csrf-token')
                axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
            }
            getCsrfToken();
        }, []);

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider };