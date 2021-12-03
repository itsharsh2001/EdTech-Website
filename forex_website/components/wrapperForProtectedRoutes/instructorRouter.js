import {useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'

const InstructorRouter = ({children})=>{
    const [ok, setOk] = useState(false);

    const router = useRouter();

    useEffect(()=>{
        fetchInstructor();
    },[ok]);

    const fetchInstructor = async()=>{
        try{
            const {data} = await axios.get('/api/current-instructor');
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

export default InstructorRouter
