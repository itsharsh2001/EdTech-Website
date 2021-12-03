import classes from "./newCoursePlaylist.module.css";
// import Switch from '@material-ui/core/Switch';
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default function Home(props) {
  const [isFree, setFree] = useState(false);
  const [title, setTitle] = useState(null);
  const [coursePrice, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [type, setType] = useState(null)
  const [wait, setWait] = useState(false);

  const handlerButton = async () => {
    setWait(true)
    try {
      const { data } = await axios.post("/api/create-playlist", {
        title,
        description,
        coursePrice,
        isFree,
        type:type
      });
      setWait(false)
      props.backToUploadInputs();
    } catch (error) {
      setWait(false)
      toast(error.response.data.message)
    }
  };

  const selectChangeHandler = () => {
    let e = document.getElementById("selection");
    let strUser = e.options[e.selectedIndex].text;
    setType(strUser)
  };

  return (
    <InstructorRouter>
      <div className={classes.box}>
        <section><CloseIcon onClick={props.backToUploadInputs} style={{fontSize: '30px', marginRight:'20px', marginTop:'20px'}} /></section>
        <h2>New Course Playlist Settings</h2>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Course Title"
          name=""
          id=""
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="Number"
          placeholder="Course Price (INR)"
          name=""
          id=""
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name=""
          placeholder="Course Description"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <select
            id="selection"
            className={classes.select}
            onChange={selectChangeHandler}
          >
            <option value = ''> Select Playlist Type </option>
            <option value="Basic">Basic</option>
            <option value="Advance">Advance</option>
          </select>
        {/* <div className={classes.switch}>
          <p>Paid</p>
          <Switch onChange={(e) => setFree(e.target.checked)} />
          <span className={classes.switchIcon}></span>
          <p>Free</p>
        </div> */}
        {
          !wait?
          <button onClick={handlerButton}>Done</button>
          : 
          <button disabled>Wait.</button>
        }

      </div>
    </InstructorRouter>
  );
}
