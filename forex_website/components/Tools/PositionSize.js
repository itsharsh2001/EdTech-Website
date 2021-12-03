import classes from './PositionSize.module.css'

export default function PositionSize() {
    return (
        <div className={classes.gainloss} >
            <section>
                <h1>Position Size Calculator</h1>
                <p>One of the most important tools in a trader&apos;s bag is risk management. Proper position sizing is key to managing risk and to avoid blowing out your account on a single trade.</p>
                <p>With a few simple inputs, our position size calculator will help you find the approximate amount of currency units to buy or sell to control your maximum risk per position.</p>
                <p>To use the position size calculator, enter the currency pair you are trading, your account size, and the percentage of your account you wish to risk. Our position sizing calculator will suggest position sizes based on the information you provide.</p>

                <span>
                    <div>
                    <select><option value="">Account Currency</option><option value="">USD</option><option value="">EUR</option><option value="">JPY</option><option value="">GBP</option><option value="">CHF</option><option value="">AUD</option><option value="">CAD</option><option value="">NZD</option></select>
                    <input type="number" placeholder="Account Balance" />
                    <input type="number" placeholder="Risk Percentage"/>
                    <input type="number" placeholder="Stop Loss(pips)" />
                    <select><option value="">Currency Pair</option><option value="">EUR/USD</option><option value="">GBP/USD</option><option value="">USD/CHF</option><option value="">USD/CAD</option><option value="">USD/JPY</option><option value="">NJD/USD</option><option value="">AUD/USD</option><option value="">EUR/AUD</option><option value="">EUR/GBP</option><option value="">EUR/JPY</option><option value="">EUR/CAD</option><option value="">EUR/CHF</option><option value="">EUR/NZD</option><option value="">GBP/CAD</option><option value="">GBP/CHP</option><option value="">GBP/JPY</option><option value="">GBP/AUD</option><option value="">GBP/NZD</option><option value="">AUD/CUD</option><option value="">AUD/JPY</option><option value="">AUD/CHF</option><option value="">AUD/NZD</option><option value="">CHF/JPY</option><option value="">CAD/CHF</option><option value="">CAD/JPY</option><option value="">NZD/CHF</option><option value="">NZD/JPY</option><option value="">NZD/CAD</option></select>
                    <input type="number" placeholder="Current ABC/XYZ Ask Price" />
                    </div>
                    <div>
                    <h5>Results</h5>
                    <span><p>Amount at risk</p><p>0</p> </span>
                    <span><p>Position Size(Units)</p><p>0</p> </span><span><p>Standard Lots</p><p>0</p> </span><span><p>Mini Lots</p><p>0</p> </span><span><p>Micro Lots</p><p>0</p> </span>
                    </div>
                </span>
                <button className={classes.bigbutton}>Calculate</button>
            </section>
        </div>
    )
}
