import classes from "./PivatPoint.module.css";
import {useState, useRef} from 'react'

export default function PivatPoint() {
  const low = useRef()
  const high = useRef()
  const open = useRef()
  const close = useRef()
  let FloorP;
  let FloorR1;
  let FloorR2;
  let FloorR3;
  let FloorS1;
  let FloorS2;
  let FloorS3;

  const clickHandler = () => {
    let  L = Number(low.current.value) ;
    let  H = Number(high.current.value);
    let  Open = Number(open.current.value);
    let  C = Number(close.current.value);
    // Floor
    FloorP = (H + L + C) / 3
    document.getElementById('floorP').innerHTML = FloorP.toFixed(2)
    FloorR1 = (2 * FloorP) - L  
    document.getElementById('floorR1').innerHTML = FloorR1.toFixed(2)
    FloorR2 = FloorP + H - L
    document.getElementById('floorR2').innerHTML = FloorR2.toFixed(2)
    FloorR3 = H + 2 * (FloorP - L)
    document.getElementById('floorR3').innerHTML = FloorR3.toFixed(2)
    FloorS1 = (2 * FloorP) - H
    document.getElementById('floorS1').innerHTML = FloorS1.toFixed(2)
    FloorS2 = FloorP - H + L
    document.getElementById('floorS2').innerHTML = FloorS2.toFixed(2)
    FloorS3 = L - 2 * (H - FloorP)
    document.getElementById('floorS3').innerHTML = FloorS3.toFixed(2)
    // Woodie
    let WoodieP = (H + L + 2 * C) / 4
    document.getElementById('woodieP').innerHTML = WoodieP.toFixed(2)
    let WoodieR1 = (2 * WoodieP) - L
    document.getElementById('woodieR1').innerHTML = WoodieR1.toFixed(2)
    let WoodieR2 = WoodieP + H - L
    document.getElementById('woodieR2').innerHTML = WoodieR2.toFixed(2)
    let WoodieS1 = (2 * WoodieP) - H
    document.getElementById('woodieS1').innerHTML = WoodieS1.toFixed(2)
    let WoodieS2 = WoodieP - H + L
    document.getElementById('woodieS2').innerHTML = WoodieS2.toFixed(2)
    // Camarilla
    let CamarillaR4 = (H - L) * 1.1 / 2 + C
    document.getElementById('camarillaR4').innerHTML = CamarillaR4.toFixed(2)
    let CamarillaR3 = (H - L) * 1.1 / 4 + C
    document.getElementById('camarillaR3').innerHTML = CamarillaR3.toFixed(2)
    let CamarillaR2 = (H - L) * 1.1 / 6 + C
    document.getElementById('camarillaR2').innerHTML = CamarillaR2.toFixed(2)
    let CamarillaR1 = (H - L) * 1.1 / 12 + C
    document.getElementById('camarillaR1').innerHTML = CamarillaR1.toFixed(2)
    let CamarillaS1 = C - (H - L) * 1.1 / 12
    document.getElementById('camarillaS1').innerHTML = CamarillaS1.toFixed(2)
    let CamarillaS2 = C - (H - L) * 1.1 / 6
    document.getElementById('camarillaS2').innerHTML = CamarillaS2.toFixed(2)
    let CamarillaS3 = C - (H - L) * 1.1 / 4
    document.getElementById('camarillaS3').innerHTML = CamarillaS3.toFixed(2)
    let CamarillaS4 = C - (H - L) * 1.1 / 2
    document.getElementById('camarillaS4').innerHTML = CamarillaS4.toFixed(2)

    // Tom DeMark's
    if(C < Open){
      let X = H + 2 * L + C
      let NewS1 = X / 2 - L
      document.getElementById('tomS1').innerHTML = NewS1.toFixed(2)
      let NewR1 = X / 2 - H
      document.getElementById('tomR1').innerHTML = NewR1.toFixed(2)
    }
    if(C > Open){
      let X = 2 * H + L + C
      let NewS1 = X / 2 - L
      document.getElementById('tomS1').innerHTML = NewS1.toFixed(2)
      let NewR1 = X / 2 - H
      document.getElementById('tomR1').innerHTML = NewR1.toFixed(2)
    }
    if(C == Open){
      let X = H + L + 2 * C
      let NewS1 = X / 2 - L
      document.getElementById('tomS1').innerHTML = NewS1.toFixed(2)
      let NewR1 = X / 2 - H
      document.getElementById('tomR1').innerHTML = NewR1.toFixed(2)
    }
    

    // Fibonacci
    let PP = (H + L + C) / 3
    document.getElementById('fibonacciP').innerHTML = PP.toFixed(2)
    let FibonacciR3 = PP + ((H - L) * 1.000)
    document.getElementById('fibonacciR3').innerHTML = FibonacciR3.toFixed(2)
    let FibonacciR2 = PP + ((H - L) * 0.618)
    document.getElementById('fibonacciR2').innerHTML = FibonacciR2.toFixed(2)
    let FibonacciR1 = PP + ((H - L) * 0.382)
    document.getElementById('fibonacciR1').innerHTML = FibonacciR1.toFixed(2)
    let FibonacciS1 = PP - ((H - L) * 0.382)
    document.getElementById('fibonacciS1').innerHTML = FibonacciS1.toFixed(2)
    let FibonacciS2 = PP - ((H - L) * 0.618)
    document.getElementById('fibonacciS2').innerHTML = FibonacciS2.toFixed(2)
    let FibonacciS3 = PP - ((H - L) * 1.000)
    document.getElementById('fibonacciS3').innerHTML = FibonacciS3.toFixed(2)
  }

  return (
    <div className={classes.gainloss}>
      <section>
        <h1>Pivot Point Calculator</h1>
        <p>
          Determine significant daily, weekly, and monthly support and
          resistance levels with the help of pivot points. To learn more about
          how they work, check out our Pivot Point lesson.
        </p>
        <p>
          {" "}
          Just enter the previous period&apos;s data below and press the &quot;Calculate&quot;
          button.
        </p>
        <span>
          <input ref={high} type="number" placeholder="High Price" />
          <input ref={low} type="number" placeholder="Low Price" />
          <input ref={open} type="number" placeholder="Open Price" />
          <input ref={close} type="number" placeholder="Close Price" />
        </span>
        <button onClick={clickHandler} >Calculate</button>

        <table className={classes.table}>
          <tr>
            <th className={classes.firstcolumn}></th>
            <th>Floor</th>
            <th>Woodie</th>
            <th>Camarilla</th>
            <th>Demark</th>
            <th>Fibonacci</th>
          </tr>
          <tr>
            <td style={{color:'red'}} className={classes.firstcolumn}>R4</td>
            <td>-</td>
            <td>-</td>
            <td id="camarillaR4" >-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td style={{color:'red'}} className={classes.firstcolumn}>R3</td>
            <td id="floorR3">-</td>
            <td>-</td>
            <td id="camarillaR3" >-</td>
            <td>-</td>
            <td id="fibonacciR3" >-</td>
          </tr>
          <tr>
            <td style={{color:'red'}} className={classes.firstcolumn}>R2</td>
            <td id="floorR2">-</td>
            <td id="woodieR2">-</td>
            <td id="camarillaR2">-</td>
            <td>-</td>
            <td id="fibonacciR2">-</td>
          </tr>
          <tr>
            <td style={{color:'red'}} className={classes.firstcolumn}>R1</td>
            <td id="floorR1">-</td>
            <td id="woodieR1">-</td>
            <td id="camarillaR1">-</td>
            <td id="tomR1">-</td>
            <td id="fibonacciR1">-</td>
          </tr>
          <tr>
            <td className={classes.firstcolumn}>PP</td>
            <td id="floorP">-</td>
            <td id="woodieP">-</td>
            <td>-</td>
            <td>-</td>
            <td id="fibonacciP">-</td>
          </tr>
          <tr>
            <td style={{color:'green'}} className={classes.firstcolumn}>S1</td>
            <td id="floorS1">-</td>
            <td id="woodieS1">-</td>
            <td id="camarillaS1">-</td>
            <td id="tomS1">-</td>
            <td id="fibonacciS1">-</td>
          </tr>
          <tr>
            <td style={{color:'green'}} className={classes.firstcolumn}>S2</td>
            <td id="floorS2">-</td>
            <td id="woodieS2">-</td>
            <td id="camarillaS2">-</td>
            <td>-</td>
            <td id="fibonacciS2">-</td>
          </tr>
          <tr>
            <td style={{color:'green'}} className={classes.firstcolumn}>S3</td>
            <td id="floorS3">-</td>
            <td>-</td>
            <td id="camarillaS3">-</td>
            <td>-</td>
            <td id="fibonacciS3">-</td>
          </tr>
          <tr>
            <td style={{color:'green'}} className={classes.lastrow}>S4</td>
            <td>-</td>
            <td>-</td>
            <td id="camarillaS4">-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </table>

        <h5>About Pivot Points</h5>
        <h5>Floor</h5>
        <p>
          The floor pivot points are the most basic and popular type of pivots.
          The pivot point is interpreted as the primary support/resistance level
          - the point at which the main trend is determined. First-third level
          resistance and support points serve as additional indicators of
          possible trend reversal or continuation.
        </p>

        <p className={classes.gray}>
          Pivot (P) = (H+L+C)/3
          <br />
          Resistance (R1) = (2xP)-L
          <br />
          R2 = P+H-L
          <br />
          R3 = H+2x(P-L)
          <br />
          Support(S1) = (2xP)-H
          <br />
          S2 = P-H+L
          <br />
          S3 = L-2x(H-P)
        </p>
        <h5>Woodie</h5>
        <p>
          Woodie&apos;s pivot points are similar to floor pivot points, the
          difference being is that more weight is given to the Close price of
          the previous period.
        </p>

        <p className={classes.gray}>
          Pivot (P) = (H + L + 2 x C) / 4
          <br />
          Resistance (R1) = (2 x P) - L
          <br />
          R2 = P + H - L
          <br />
          Support (S1) = (2 x P) - H
          <br />
          S2 = P - H + L
        </p>
        <h5>Camarilla</h5>

        <p>
          Camarilla pivot points are a set of eight very probable levels which
          resemble support and resistance values for a current trend. The most
          important is that these pivot points work for all traders and help in
          setting the right stop-loss and profit-target orders.
        </p>
        <p className={classes.gray}>
          R4 = (H - L) x 1.1 / 2 + C
          <br />
          R3 = (H - L) x 1.1 / 4 + C
          <br />
          R2 = (H - L) x 1.1 / 6 + C
          <br />
          R1 = (H - L) x 1.1 / 12 + C
          <br />
          S1 = C - (H - L) x 1.1 / 12
          <br />
          S2 = C - (H - L) x 1.1 / 6
          <br />
          S3 = C - (H - L) x 1.1 / 4
          <br />
          S4 = C - (H - L) x 1.1 / 2
        </p>

        <h5>Tom DeMark&apos;s</h5>

        <p>
          Another popular method of calculating the pivots to forecast the
          future of the trend is Tom DeMark&apos;s pivot points, which are not pivot
          points exactly, but are the predicted lows and highs of the period.
        </p>
        <p className={classes.gray}>
          If Close lesser than Open: X = H + 2 x L + C
          <br />
          If Close greatar than Open: X = 2 x H + L + C
          <br />
          If Close = Open: X = H + L + 2 x C
          <br />
          New High = X / 2 - L
          <br />
          New Low = X / 2 - H
        </p>

        <h5>Fibonacci</h5>
        <p>
          Fibonacci pivot point levels are determined by first calculating the
          floor pivot points. Next, multiply the previous day&apos;s range with its
          corresponding Fibonacci level. Most traders use the 38.2%, 61.8% and
          100% retracements in their calculations. Finally, add or subtract the
          figures you get to the pivot point and voila, you&apos;ve got your
          Fibonacci pivot point levels!
        </p>
        <p className={classes.gray}>
          R3 = PP + ((High - Low) x 1.000)
          <br />
          R2 = PP + ((High - Low) x 0.618)
          <br />
          R1 = PP + ((High - Low) x 0.382)
          <br />
          PP = (H + L + C) / 3
          <br />
          S1 = PP - ((High - Low) x 0.382)
          <br />
          S2 = PP - ((High - Low) x 0.618)
          <br />
          S3 = PP - ((High - Low) x 1.000)
        </p>
      </section>
    </div>
  );
}
