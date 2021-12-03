import classes from "./uploadInputs.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import { useEffect } from 'react'
import router from "next/router";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default function Home(props) {


  const video = localStorage.getItem('videoLink')

  const [isFree, setFree] = useState(false);
  const [des, setDes] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setResizeImage] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [playListFromDb, setPlayListDb] = useState([])

  const [pdfFile, setPdfFile] = useState(null);
  const [caption, setCaption] = useState(null);

  const [uploading, setUploading] = useState(false);

  if (typeof window !== 'undefined' && window.localStorage) {
    const video = localStorage.getItem("videoLink");
  }



  const setImage = async (e) => {
    Resizer.imageFileResizer(e, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        setResizeImage(uri);
      } catch (err) {
        console.log(err, "image uploaded failed");
      }
    });
  };

  const selectChangeHandler = () => {
    let e = document.getElementById("selection");
    let strUser = e.options[e.selectedIndex].text;
    setPlaylist(e.value);
    if (strUser === "Create New Playlist") {
      props.newCoursePlayListHandler();
    }
  };


  const getPlaylist = async () => {

    const { data } = await axios.get('/api/get-playlist')
    setPlayListDb(data.message)
  }

  useEffect(() => {
    getPlaylist()

  }, [])

  const proceed = async (req, res) => {
    setUploading(true)

    try {

      let pdfFileLocation;
      let CaptionFileLocation;
      let pdfKey;
      let captionKey;

      if (caption) {


        try {
          var formData = new FormData();
          formData.append("video", caption);
          const { data } = await axios.post("/api/instructor/add-videos", formData);
          CaptionFileLocation = data.link;
          captionKey = data.key;
        } catch (error) {
          console.log(error)
        }

      }


      try {
        var formData = new FormData();
        formData.append("video", pdfFile);
        const { data } = await axios.post("/api/instructor/add-videos", formData);
        pdfFileLocation = data.link;
        pdfKey = data.key
      } catch (error) {
        console.log(error)
      }

      const { data } = await axios.post(
        "/api/instructor/add-videos/video-inputs",
        {
          title,
          description: des,
          image,
          video,
          playlist,
          isFree,
          pdfFile: pdfFileLocation,
          caption: CaptionFileLocation,
          pdfKey,
          captionKey
        }
      );
      setUploading(false)
      router.reload();
    } catch (error) {
      setUploading(false)
      toast(error.response.data.message);
    }
  };

  return (
    <InstructorRouter>
      <div className={classes.box}>
        <div className={classes.div1}>
          <input
            placeholder="Video Title"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name=""
            id=""
          />
          <textarea
            onChange={(e) => setDes(e.target.value)}
            placeholder="Description"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className={classes.div2}>
          {/* <h2>Uploading... (84%) 72Mbps</h2> */}
          <p className={classes.textafterupload}>
            Some more attributes regarding the video:
          </p>
          <select
            onChange={selectChangeHandler}
            id="selection"
            className={classes.select}
            placeholder="select from options below"
          >
            {/* <option value=""></option> */}
            <option value="">Select PlayList...</option>
            {
              playListFromDb.map((item, index) => {
                return (
                  <option key={index} value={item.title}>{item.title}</option>
                )
              })
            }
            <option value="CreateNewPlaylist">Create New Playlist</option>
          </select>
          {/* <div className={classes.icontextButton}>
            <p style={{ color: "black" }}>Upload a caption file</p>
            <CloudUploadIcon
              className={classes.icon}
              style={{ fill: "#000000" }}
            />
          </div> */}
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
            name=""
            id="thumbnail"
          />
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
            onChange={(e) => setCaption(e.target.files[0])}
            name=""
            id="caption"
          />
          <div className={classes.icontextButton}>
            <p style={{ color: "white" }}>Upload a Caption</p>
            <label htmlFor="caption">
              <CloudUploadIcon
                className={classes.icon}
                style={{ fill: "#ffffff" }}
              />
            </label>
          </div>

          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setPdfFile(e.target.files[0])}
            name=""
            id="pdfNotes"
          />
          <div className={classes.icontextButton}>
            <p style={{ color: "white" }}>Upload a Pdf File</p>
            <label htmlFor="pdfNotes">
              <CloudUploadIcon
                className={classes.icon}
                style={{ fill: "#ffffff" }}
              />
            </label>
          </div>
          {/* <section className={classes.switchsection}>
          <span className={classes.switch} >Paid</span>
          <Switch className={classes.switch} onChange={(e) => setFree(e.target.checked)} />
          <span className={classes.switch}>Free</span>
          </section> */}
          {
            uploading ?
              <button onClick={proceed} disabled>Proceeding...</button> :
              <button onClick={proceed}>Proceed</button>
          }

        </div>
      </div>
    </InstructorRouter>
  );
}
