import classes from "./buy-course.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function Component(props) {
  const router = useRouter();

  async function displayRazorpay(price, type, title) {
    console.log('hello')
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("razorpay is not working");
      return;
    }

    try {
      const { data } = await axios.post("/api/create-payment", {
        planType: type,
        planName: title,
        payingPrice: price,
      });

      var options = {
        key: "",
        currency: data.ordercurrency,
        amount: data.orderamount,
        name: data.ordername,
        description: data.orderreceipt,
        image: "/Aboota-Logo-white.png",
        order_id: data.orderid,

        handler: function (response) {
          router.push(`/Courses/${props.type}`);
        },
        prefill: {
          name: data.ordername,
          email: data.orderemail,
          contact: data.orderphone,
        },
      };
      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err)
        if(err.message=="failed"){
          router.push('/login')
        }
    }
  }

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState("");


  const getPlanDetails = async ()=>{
    const { data } = await axios.post("/api/plan-details", {
      type: props.type,
    });

    if (data.message) {
      setType(data.message.type);
      setDescription(data.message.description);
      setPrice(data.message.coursePrice);
      setData(data.message);
    }
  }

  const checkingStudent = async ()=>{
     
    const {data} = await axios.post('/api/check-student',
    {
      type:props.type
    }
    )


    if(data.message){
      router.push(`/Courses/${props.type}`)
    }
  }


  useEffect(() => {

    getPlanDetails();
    
  }, [props.type]);

  useEffect(()=>{

    checkingStudent();

  },[])

  const pushToCoursesSection = () => {
    router.push(`/Courses/${props.type}`);
  };

  return (
    <>
      <div className={classes.body}>
        <div style={{ color: "white", textAlign: "right" }}>
          <ClearIcon
            onClick={pushToCoursesSection}
            style={{ fontSize: "30px", marginRight: "30px", marginTop: "20px" }}
          />
        </div>
        <div className={classes.image}>
          {
            props.type=='Basic'? <img className={classes.boxUnderImage} src='/allabootaicons/basic.png' alt="" />:null
          }
        {/* {
            props.type=='Midway'? <img className={classes.boxUnderImage} src='/allabootaicons/highschool.png' alt="" />:null
          } */}
          {
            props.type=='Advance'? <img className={classes.boxUnderImage} src='/allabootaicons/advance.png' alt="" />:null
          }
        </div>
        <h1>{type}</h1>
        <h2>Course Fee: INR {price}/-</h2>
        <button
          onClick={() =>
            displayRazorpay(data.coursePrice, props.type, data.title)
          }
        >
          Purchase This Course
        </button>
      </div>
    </>
  );
}
