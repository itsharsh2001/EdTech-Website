import classes from './GetInTouch.module.css'
import {useState} from 'react';
import axios from 'axios'

export default function GetInTouch() {

    const [name,setName] = useState(null)
    const [email,setEmail] = useState(null)
    const [message,setMessage] = useState(null)
    const [phone, setPhone] = useState(null)

    const [error, setError] = useState(null)


    const buttonHandler = async ()=>{

        setError('');

        try{

            const {data} = await axios.post('/api/contact-us',{
                email,
                name,
                phone,
                query:message
            })

            setError(data.message);

        }catch(error){
            setError(error.response.data.message)
        }
         
    }


    return (
        <div className={classes.getintouch} >
            <hr />
            <h1>Get in touch</h1>
            <form onSubmit={(e)=>e.preventDefault()} action="" method="post">
                <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Full Name" />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E Mail" />
                <input onChange={(e)=>setPhone(e.target.value)} type="tel" placeholder="Phone" />
                <p>We will use this to get in touch with you, so in case you provide an e-mail, please make sure that&apos;s the one you check often.</p>
                <textarea onChange={(e)=>setMessage(e.target.value)} placeholder="Your Query or Message" cols="30" rows="10"></textarea>
                <button onClick={buttonHandler} type="submit">SEND</button>
                <p>{error}</p>
            </form>
            <hr />
        </div>
    )
}
