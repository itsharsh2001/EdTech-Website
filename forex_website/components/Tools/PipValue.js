import classes from "./PipValue.module.css";
import Link from 'next/link'

export default function PipValue() {
  return (
    <div className={classes.gainloss}>
      <section>
        <h1>Pip Value Calculator</h1>
        <p> How much is each pip worth?</p>
        <p>
          {" "}
          This tool will help you determine the value per pip in your account
          currency, so that you can better manage your risk per trade.
        </p>
        <p>
          {" "}
          All you need is the currency your account is denominated in, the
          currency pair you aretrading, your position size, and the exchange
          rate asked to calculate the pip value.
        </p>

        <span>
          <div>
            <select>
              <option value="">Currency Pair</option>
              <option value="">EUR/USD</option>
              <option value="">GBP/USD</option>
              <option value="">USD/CHF</option>
              <option value="">USD/CAD</option>
              <option value="">USD/JPY</option>
              <option value="">NJD/USD</option>
              <option value="">AUD/USD</option>
              <option value="">EUR/AUD</option>
              <option value="">EUR/GBP</option>
              <option value="">EUR/JPY</option>
              <option value="">EUR/CAD</option>
              <option value="">EUR/CHF</option>
              <option value="">EUR/NZD</option>
              <option value="">GBP/CAD</option>
              <option value="">GBP/CHP</option>
              <option value="">GBP/JPY</option>
              <option value="">GBP/AUD</option>
              <option value="">GBP/NZD</option>
              <option value="">AUD/CUD</option>
              <option value="">AUD/JPY</option>
              <option value="">AUD/CHF</option>
              <option value="">AUD/NZD</option>
              <option value="">CHF/JPY</option>
              <option value="">CAD/CHF</option>
              <option value="">CAD/JPY</option>
              <option value="">NZD/CHF</option>
              <option value="">NZD/JPY</option>
              <option value="">NZD/CAD</option>
            </select>
            <input type="number" placeholder="Ask Price" />
            <input type="number" placeholder="Position Size(Units)" />
            <select>
              <option value="">Account Currency</option>
              <option value="">USD</option>
              <option value="">EUR</option>
              <option value="">JPY</option>
              <option value="">GBP</option>
              <option value="">CHF</option>
              <option value="">AUD</option>
              <option value="">CAD</option>
              <option value="">NZD</option>
            </select>
            <input type="number" placeholder="Price for USD/JPY" />
          </div>

          <div>
            <h5>Results</h5>
            <span>
              <p>Pip Value:</p>
              <p>0</p>{" "}
            </span>
            <p className={classes.link}>
              Are you about to enter a trade? You might also want to check out
              our <Link href="/">position size calculator</Link>.
            </p>
            <p>
              It can help you to calculate the optimal size of your initial
              position depending on your stop-loss in pips, risk tolerance and
              account size.
            </p>
          </div>
        </span>
        <button className={classes.bigbutton} >Calculate</button>
      </section>
    </div>
  );
}
