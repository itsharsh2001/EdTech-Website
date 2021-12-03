import classes from "./StartWebinar.module.css";
import img1 from "../../public/img1.jpg";
import Link from "next/link";
import Switch from "@material-ui/core/Switch";
import { useState, useEffect } from "react";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Resizer from "react-image-file-resizer";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default function StartWebinar() {
  const router = useRouter();
  const [proceed, setProceed] = useState(false);

  const setImage = async (e) => {
    Resizer.imageFileResizer(e, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        setResizeImage(uri);
      } catch (err) {
        console.log(err, "image uploaded failed");
      }
    });
  };

  const websiteHandler = async () => {
    setProceed(true);
    try {
      const { data } = await axios.post("/api/website-webinar", {
        title: title,
        Description: description,
        image: image,
        meetingLink: zoomLink,
      });
      setProceed(false);
      router.push('/')
    } catch (error) {
      setProceed(false);
      toast(error.response.data.message);
    }
  };

  const meetHandler = async () => {
    setProceed(true);
    try {
      const { data } = await axios.post("/api/meet-webinar", {
        title: title,
        Description: description,
        googleMeetLink: meetLink,
        image: image,
      });
      setProceed(false);
      router.push('/')
    } catch (error) {
      setProceed(false);
      toast(error.response.data.message);
    }
  };

  const [meet, setMeet] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [meetLink, setMeetLink] = useState(null);
  const [image, setResizeImage] = useState(null);
  const [zoomId, setZoomId] = useState(null);
  const [zoomPassword, setPassword] = useState(null);
  const [zoomLink, setLink] = useState(null);

  const [websiteWebinar, setWebsiteWebinar] = useState(null);
  const [meetWebinar, setMeetWebinar] = useState(null);
  const [meetWebinarStatus, setMeetWebinarStatus] = useState(null);
  const [websiteWebinarStatus, setWebisteWebinarStatus] = useState(null);
  const [isWebinar, setIsWebinar] = useState(null);

  const getWebinar = async()=>{
    const { data } = await axios.get("/api/get-webinar");
    setWebsiteWebinar(data.websiteWebinarStatus);
    setMeetWebinar(data.meetwebinarStatus);
    setMeetWebinarStatus(data.meetWeb);
    setWebisteWebinarStatus(data.websiteWeb);
    setIsWebinar(data.webinar);
  }
 

  useEffect( () => {
    getWebinar();
  }, []);

  const deletemeetWebinar = async () => {
    try {
      const { data } = await axios.get("/api/delete-meet-webinar");

      router.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deletewebsiteWebinar = async () => {
    try {
      const { data } = await axios.get("/api/delete-website-webinar");

      router.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className={classes.start}>
      {meet ? (
        meetWebinarStatus ? (
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "white" }}>
              Current Webinar --{" "}
              <span style={{ color: "skyBlue" }}>{meetWebinar.title}</span>
            </span>
            <DeleteIcon
              onClick={deletemeetWebinar}
              style={{ color: "white", position: "relative", top: "7px" }}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "white" }}>
              Current Webinar --{" "}
              <span style={{ color: "skyBlue" }}>No Webinar</span>
            </span>
          </div>
        )
      ) : websiteWebinarStatus ? (
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "white" }}>
            Current Webinar --{" "}
            <span style={{ color: "skyBlue" }}>{websiteWebinar.title}</span>
          </span>
          <DeleteIcon
            onClick={deletewebsiteWebinar}
            style={{ color: "white", position: "relative", top: "7px" }}
          />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "white" }}>
            Current Webinar --{" "}
            <span style={{ color: "skyBlue" }}>No Webinar</span>
          </span>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className={classes.meetLink}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Webinar Title"
        />

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        {meet ? (
          <input
            onChange={(e) => setMeetLink(e.target.value)}
            className={classes.meetLink}
            type="text"
            placeholder="Meet Link"
          />
        ) : (
          <span>
            <input
              onChange={(e) => setLink(e.target.value)}
              className={classes.meetLink}
              type="text"
              placeholder="Meeting Link"
            />
          </span>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
          name=""
          id="thumbnail"
        />
        <div className={classes.icontextButton}>
          <p style={{ color: "black" }}>Upload a thumbnail</p>
          <label htmlFor="thumbnail">
            <CloudUploadIcon
              className={classes.icon}
              style={{ fill: "#ffffff" }}
            />
          </label>
        </div>
        <section className={classes.switchsection}>
          <span className={classes.switch} style={{ color: "white" }}>
            Website
          </span>
          <Switch
            className={classes.switch}
            onChange={(e) => setMeet(e.target.checked)}
          />
          <span className={classes.switch} style={{ color: "white" }}>
            Meet
          </span>
        </section>
        {
        meet ? 
        proceed?
          <button disabled>Please Wait..</button>:
          <button onClick={meetHandler}>Start Meet Webinar</button>
         : 
         proceed?
         <button disabled>Please Wait..</button>:
         <button onClick={websiteHandler}>Start Webinar</button>
        }
      </form>
      <hr />
    </div>
  );
}
