import classes from './UserDatabase.module.css'
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Requests() {

    const [paidClients, setPaidClients] = useState(null);

    const gettingPaidClients = async()=>{
        const {data} = await axios.get('/api/get-paid-client');
        setPaidClients(data.message);
    }
    
    useEffect(()=>{
        gettingPaidClients()
    },[])

    return (
        <InstructorRouter>
            
        {
            paidClients && 
            <div className={classes.userdatabase}>
            <h1>Users&apos; Database</h1>
            <ul>
                <li>Date Requested</li>
                <li>E-Mail Address</li>
                <li>Name</li>
                <li>Phone Number</li>
                <li>Payment Method</li>
            </ul>

            {paidClients.map((data, index)=>{
            return <span key={index}>
            <h4>{data.date}</h4>
            <h4>{data.email}</h4>
            <h4>{data.name}</h4>
            <h4>{data.phone}</h4>
            {/* <h4>{data.payingPrice}</h4> */}
            <h4 className={classes.lastdiv}>
                    <span>
                        <p className={classes.green}>{data.payingPrice}</p>
                        <p>Price</p>
                    </span>
                    <span>
                        <p className={classes.green}>{data.modeOfPayment}</p>
                        <p>Mode</p>
                    </span>
                    <span>
                        <p className={classes.green}>{data.planType}</p>
                        <p>Plan</p>
                    </span>
            </h4>
          </span>
        })}

        </div>
        }
        
        </InstructorRouter>
    )
}
