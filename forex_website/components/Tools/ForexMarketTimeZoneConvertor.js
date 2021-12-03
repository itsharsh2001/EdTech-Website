import classes from "./ForexMarketTimeZoneConvertor.module.css";
import Draggable from "react-draggable";
import { useState } from "react";
import Switch from "@material-ui/core/Switch";

export default function ForexMarketTimeZoneConvertor() {
  const [timeFormat, setTimeFormat] = useState(12);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <div className={classes.forexMarkettimezoneconvertor}>
      <h1>Forex Market Time Zone Converter</h1>
      
        <section className={classes.switchsection}>
          <span className={classes.switch}>12 Hours</span>
          <Switch
            className={classes.switch}
            onChange={(e) => setTimeFormat(e.target.checked)}
          />
          <span className={classes.switch}>24 Hours</span>
        </section>

        <Draggable
          bounds={{ left: 100, right: 700 }}
          // bounds="parent"
          // className={classes.draggable}
          axis="x"
          onDrag={(Event, data) => trackPos(data)}
        >
          <div className={classes.box}>
            <span>
              <div>time</div>
              <div>
                {/* x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)} */}
                am
              </div>
            </span>
            <div>Mon</div>
          {/* <div className={classes.needle} ></div> */}
          </div>
        </Draggable>
      <h3>TimeZone</h3>
      <select>
        <option value="">Midway (GMT -11)</option>
        <option value="">Hawaii (GMT -10)</option>
        <option value="">Aleutian Islands (GMT -9)</option>
        <option value="">Alaska (GMT -8)</option>
        <option value="">Los Angeles (GMT -7)</option>
        <option value="">Denver (GMT -6)</option>
        <option value="">Chicago (GMT -5)</option>
        <option value="">New York (GMT -4)</option>
        <option value="">Puerto Rico (GMT -4)</option>
        <option value="">Buenos Aires (GMT -3)</option>
        <option value="">Rio de Janeiro (GMT -1)</option>
        <option value="">Cape Verde (GMT -1)</option>
        <option value="">UTC (GMT +0)</option>
        <option value="">London (GMT +1)</option>
        <option value="">Berlin (GMT +2)</option>
        <option value="">Cairo (GMT +2)</option>
        <option value="">Moscow (GMT +3)</option>
        <option value="">Tehran (GMT +3:30)</option>
        <option value="">Dubai (GMT +4)</option>
        <option value="">Karachi (GMT +5)</option>
        <option value="">Mumbai (GMT +5:30)</option>
        <option value="">Dhaka (GMT +6)</option>
        <option value="">Yangon (GMT +6:30)</option>
        <option value="">Bangkok (GMT +7)</option>
        <option value="">Singapore (GMT +8)</option>
        <option value="">Tokyo (GMT +9)</option>
        <option value="">Darwin (GMT +9:30)</option>
        <option value="">Brisbane (GMT +10)</option>
        <option value="">Adelaide (GMT +10:30)</option>
        <option value="">
          Sydney (GMT +11)
        </option>
        <option value="">Fiji (GMT +12)</option>
        <option value="">Auckland (GMT +13)</option>
        <option value="">Kiritimati (GMT +14)</option>
      </select>

      <section>
        <div className={classes.number} >1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24</div>

        <main>
          {/* <img src="/tools/CustomSize10.png" width="50px" height="300px" alt="" /> */}
          <section className={classes.flag} >
          <div>
            <img src="/tools/Artboard2.png" alt="" />
            <span>
              <h6>
                Sydney (AUS)
              </h6>
              <p>09:14 AM</p>
            </span>
          </div>
          <div>
            <img src="/tools/Artboard3.png" alt="" />
            <span>
              <h6>
                Sydney (AUS)
              </h6>
              <p>09:14 AM</p>
            </span>
          </div>
          <div>
            <img src="/tools/Artboard4.png" alt="" />
            <span>
              <h6>
                Sydney (AUS)
              </h6>
              <p>09:14 AM</p>
            </span>
          </div>
          <div>
            <img src="/tools/Artboard5.png" alt="" />
            <span>
              <h6>
                Sydney (AUS)
              </h6>
              <p>09:14 AM</p>
            </span>
          </div>

          </section>
          <div className={classes.imagearr}>
            <img style={{transform: 'translateX(-100%)'}} src="/tools/CustomSize11new.png" alt="" />
            <img style={{transform: 'translateX(-100%)'}} src="/tools/CustomSize11new.png" alt="" />
            <img style={{transform: 'translateX(-100%)'}} src="/tools/CustomSize11new.png" alt="" />
          </div>
        </main>



        <main className={classes.graph}>
          {/* <img src="/tools/CustomSize10.png" width="50px" height="300px" alt="" /> */}
          <section className={classes.flag} >
        
         
          <div className={classes.gray}>
            <p>Trading Volume is usually low at this time of day</p>
          </div>

          </section>
          <div className={classes.imagearr2}>
            <img style={{transform: 'translateX(-100%)'}} src="/tools/Artboard12.png" alt="" />
            <img style={{transform: 'translateX(-100%)'}} src="/tools/Artboard12.png" alt="" />
            <img style={{transform: 'translateX(-100%)'}} src="/tools/Artboard12.png" alt="" />
          </div>
          
        </main>
      </section>

      {/* <img src="/Untitled-1.png" alt="" /> */}
    </div>
  );
}
