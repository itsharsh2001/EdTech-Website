import {useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'

const UseRoute = ({children})=>{
    const [ok, setOk] = useState(false);

    const router = useRouter();

    useEffect(()=>{
        fetchUser();
    },[ok]);

    const fetchUser = async()=>{
        try{
            const {data} = await axios.get('/api/current-user');
            console.log(data.message)
            if (data.message){
                setOk(true);
            } else{
                router.push('/')
            }
        }catch(err){
            setOk(false)
            router.push('/')
        }
    }
        
        return(
            <>
            {
                !ok?(
                    <span></span>
                ):
                <>
                <>{children}</>
                </>
            }
            </>
        )
};

export default UseRoute
