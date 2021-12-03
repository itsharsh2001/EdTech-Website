import classes from "./Slider.module.css";
import StarIcon from "@mui/icons-material/Star";
import { useEffect , useState} from 'react';
import axios from 'axios'
import Link from 'next/link'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
  EffectCoverflow,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Slider(props) {

  const [allWebinar, setAllWebinar] = useState([]);
  const [isShow, setIsShow] = useState(false);


  const gettingRecordedWebinars = async()=>{
    const { data } = await axios.get("/api/get-recorded-webinars");
    setAllWebinar(data.message);
    setIsShow(true);
  }

  
  useEffect(() => {
    gettingRecordedWebinars()
  }, []);

  return (
    <>
    {
      isShow?
      allWebinar && 
<div className={classes.container}>
        <div className={classes.titlewrapper}>
          <div className={classes.title_} style={{marginBottom:'20px'}}>{props.heading}</div>
        </div>
        <Swiper
          // autoplay={"true"}
          loop={true}
          modules={[Navigation,  Scrollbar, A11y, EffectCoverflow]}
          navigation={true}
          effect={"coverflow"}
          centeredSlides={true}
          // slidesPerView={Window.innerWidth<768 ? 1 : "auto"}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          className={classes.swipercontainer}
        >
          {allWebinar.map((i, index) => {
            return (
              <SwiperSlide key={index} className={classes.swiperslide}>
               <Link href={`/webinar/${i.title}`}>
                 <span>
                <span
                  style={{ backgroundImage: `url(${i.thumbnail})` }}
                  className={classes.first}
                >
                  <h1></h1>
                  <div>
                    <h2>{i.title}</h2>
                    <span>
                      <StarIcon className={classes.star} />
                      <StarIcon className={classes.star} />
                      <StarIcon className={classes.star} />
                      <StarIcon className={classes.star} />
                      <StarIcon className={classes.star} />
                    </span>
                  </div>
                </span>{" "}
                </span>
                </Link>
              </SwiperSlide>

            );
          })}  
        </Swiper>

      </div>
      :
      null
    }
      
    </>
  );
}
