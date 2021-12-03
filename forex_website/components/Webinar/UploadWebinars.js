import classes from "./UploadWebinars.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Switch from '@mui/material'
import { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Home(props) {
  let videoKey;
  const router = useRouter();

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setResizeImage] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  
  const [proceed, setProceed] = useState(false);

  


  const [videoAdded, setVideoAdded] = useState(false);

  const setImage = async (e) => {
    Resizer.imageFileResizer(e, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        setResizeImage(uri);
      } catch (err) {
        console.log(err, "image uploaded failed");
      }
    });
  };

  const uploadVideo = async (file) => {
    setVideoAdded(true)
    try {
      const videoData = new FormData();
      videoData.append("video", file);

      const { data } = await axios.post(
        "/api/instructor/add-videos",
        videoData
      );
      setVideo(data.link);
      videoKey = data.key;
      setVideoAdded(false)
    } catch (error) {
      setVideoAdded(false)
      toast(error.response.data.message);
    }
  };

  const buttonHandler = async () => {
    setProceed(true);
    let fileLocation = ''
    let fileKey = ''

    try {
      var formData = new FormData();
      formData.append("video", file);

      if(file){

        const { data } = await axios.post("/api/instructor/add-videos", formData);

        fileLocation = data.link;
        fileKey = data.key
      }


      const { data2 } = await axios.post("/api/pre-recorded-webinar", {
        title: title,
        description: description,
        image: image,
        caption: fileLocation,
        video: video,
        videoKey : videoKey,
        captionKey: fileKey
      });
      setProceed(false);
      router.reload();
    } catch (error) {
      setProceed(false);
      toast(error.response.data.message);
    }
  };

  return (
    <>
      <div className={classes.box}>
        <div className={classes.div1}>
          <input
            placeholder="Webinar Title"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name=""
            id=""
          />

          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>

          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
            name=""
            id="thumbnail"
          />

          <input
            type="file"
            accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
            name=""
            id="file"
          />
        </div>
        <div className={classes.div2}>
          {/* <h2>Uploading... (84%) 72Mbps</h2> */}
          <p className={classes.textafterupload}>
            Some more attributes regarding the webinar:
          </p>
          <div className={classes.icontextButton}>
            <p style={{ color: "white" }}>Upload a caption file</p>
            <label htmlFor="file">
              <CloudUploadIcon
                className={classes.icon}
                style={{ fill: "#ffffff" }}
              />
            </label>
          </div>
          <div className={classes.icontextButton}>
            <p style={{ color: "white" }}>Upload a thumbnail</p>
            <label htmlFor="thumbnail">
              <CloudUploadIcon
                className={classes.icon}
                style={{ fill: "#ffffff" }}
              />
            </label>
          </div>

          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => uploadVideo(e.target.files[0])}
            accept="video/*"
            className={classes.inputFile}
            name=""
            id="video"
          />

          <div className={classes.icontextButton}>
            <p style={{ color: "white" }}>Upload a Video</p>
            <label htmlFor="video">
              <CloudUploadIcon
                className={classes.icon}
                style={{ fill: "#ffffff" }}
              />
            </label>
          </div>
          {proceed ? (
            <button disabled>Proceeding..</button>
          ) : (
            <span>
              {
              !videoAdded &&
              <button onClick={buttonHandler}>Proceed</button>
              }
               {
              videoAdded &&
              <button disabled>video uploading...</button>
              }
            
            </span>
          )}
        </div>
      </div>
    </>
  );
}
