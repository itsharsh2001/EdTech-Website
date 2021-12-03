import { ZoomMtg } from "@zoomus/websdk";
import router from "next/router";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context";
import axios from 'axios'

const Zoom = (props) => {

 // state
 const { state, dispatch } = useContext(Context);
 const { user } = state;

 var userName = user.user.name;
 var userEmail = user.user.email


const crypto = require("crypto"); // crypto comes with Node.js

var apiKey = process.env.NEXT_PUBLIC_FRONTEND_ZOOM_API;
var apiSecret = process.env.NEXT_PUBLIC_FRONTEND_ZOOM_API_SECRET;
var meetingNumber = process.env.NEXT_PUBLIC_FRONTEND_ZOOM_MEETING_NUMBER;
var leaveUrl = 'http://localhost:3000/'; // our redirect url
var userName = userName;
var userEmail = userEmail;
var passWord = process.env.NEXT_PUBLIC_FRONTEND_ZOOM_PASSWORD;



function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    // Prevent time sync issue between client signature generation and zoom
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      "base64"
    );
    const hash = crypto
      .createHmac("sha256", apiSecret)
      .update(msg)
      .digest("base64");
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString("base64");

    res(signature);
  });
}

var signature = "";
generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res) => {
  signature = res;
}); // need to generate based on meeting id - using - role by default 0 = javascript


    // loading zoom libraries before joining on component did mount
    useEffect(() => {

    
        // const {data} = await axios.get('/check-paid-client')
    
        // if(data.message){
          showZoomDIv();
          ZoomMtg.setZoomJSLib("https://source.zoom.us/2.0.1/lib", "/av");
          ZoomMtg.preLoadWasm();
          ZoomMtg.prepareJssdk();
          initiateMeeting();
        // }else{
        //   router.push('/')
        // }

    }, []);
  
    const showZoomDIv = () => {
      document.getElementById("zmmtg-root").style.display = "block";
    };

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return <div className="App">Zoom</div>;
};

export default Zoom;
