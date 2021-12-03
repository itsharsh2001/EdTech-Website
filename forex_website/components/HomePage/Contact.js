import classes from './Contact.module.css'
import Link from 'next/link'

export default function Contact() {
    return (
        <div id="contact" className={classes.contact}>
            <h1>Contact Us:</h1>
            <div>
                <p>M-1107, JMD Megapapolis, Sector-48, Sohna Road,</p>
                <p>Gurugram, Haryana - 122018</p>
            </div>
            <p className={classes.special}>aboota00@gmail.com</p>
            <div>
                <p>+91 9910749407</p>
                <p>+91 7390986490</p>
                <Link href='/PrivacyPolicy'><p style={{color:'#0099ff',cursor:'pointer',marginTop:'20px'}}>Privacy Policy</p></Link>
                <Link href='/risk-disclosure'><p style={{color:'#0099ff',cursor:'pointer',marginBottom:'-20px'}}>Risk Disclosure</p></Link>
            </div>
            <section>
                <Link href='https://wa.me/+917009124646'>
                <span></span>
                </Link>
                <span></span>
                {/* <span></span> */}
                <Link href='https://www.instagram.com/abootaofficial/'>
                <span></span>
                </Link>
            </section>
        </div>
    )
}
