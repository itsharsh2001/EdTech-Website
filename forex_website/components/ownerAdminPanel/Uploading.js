import classes from "./Uploading.module.css";
import Link from "next/link";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Uploading() {
  const router = useRouter();

  const [title, setTitle] = useState(null);
  const [proceeding, setProceeding] = useState(false);

  const buttonHandler = async () => {
    setProceeding(true)
    try {
      const { data } = await axios.post("/api/instructor/signal-title", {
        title: title,
      });
      setProceeding(false)
      router.push("/");
    } catch (error) {
      setProceeding(false)
      console.log(error);
    }
  };

  return (
    <InstructorRouter>
      <div className={classes.box}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Signal Heading"
          />
          {/* <span>Uploading... (84%) 72Mbps</span> */}
          {
            proceeding?
            <button onClick={buttonHandler} disabled type="submit">
            Proceeding...
          </button>:
           <button onClick={buttonHandler} type="submit">
           PROCEED
         </button>
          }
        </form>
      </div>
    </InstructorRouter>
  );
}
