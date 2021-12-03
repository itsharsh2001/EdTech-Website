import classes from "./Requests.module.css";
import InstructorRouter from "../wrapperForProtectedRoutes/instructorRouter";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Requests() {
  const [query, setQuery] = useState([]);


  const getQueries = async()=>{
    try {
      const { data } = await axios.get("/api/get-queries");
      setQuery(data.message);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getQueries()
  }, []);

  return (
    <InstructorRouter>
      <div className={classes.content}>
        <h1>Requests</h1>
        <div className={classes.heading}>
        <ul>
          <li>Date Requested</li>
          <li>User Contact Info</li>
          <li>Name</li>
          <li>Query</li>
        </ul>
        </div>

        <div className={classes.dataContent}>

            {query.map((data, index)=>{
            return <ul key={index}>
            <li>{data.date}</li>
            <li>{data.email} - {data.phone}</li>
            <li>{data.name}</li>
            <li>{data.query}</li>
          </ul>
        })}
        </div>

      </div>

    </InstructorRouter>
  );
}
