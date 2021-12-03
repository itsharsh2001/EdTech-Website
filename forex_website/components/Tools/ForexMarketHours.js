import classes from "./ForexMarketHours.module.css";

import ForexMarketTimeZoneConvertor from "./ForexMarketTimeZoneConvertor";

export default function ForexMarketHours() {
  return (
    <div className={classes.forexmarkethours}>
      <section>
        <h1>Forex Market Hours</h1>
        <p>
          When does the forex market open? Use the Forex Market Time Zone
          Convertor tool below to view the opwn and close times of the main
          forex trading sessions in your own local time zone.
        </p>
        <ForexMarketTimeZoneConvertor />
        <h5>How to use the Forex Market Time Zone Convertor</h5>
        <p>
          The forex market is open 24 hours a day during the weekdays which
          allows traders to potentially trade all day and all night
        </p>
        <p>
          Knowing the forex market&apos;s operating hours is essential hours is
          essential for a trader. You need to know when the forex market opens
          and closes as well as the four main trading sessions.
        </p>
        <p>
          The Forex Market Time Zone Converter displays which trading session(s)
          is open in your current local time.
        </p>
        <h5>Forex Trading Sessions</h5>
        <p>
          Just because you can trade the market any time of the day or night
          doesn&apos;t necessarily mean that you should.
        </p>
        <p>
          The best time to trade is when the market is active with lots of forex
          traders opening and closing positions, which creates a large volume of
          trades.
        </p>
        <p>
          The forex market can be broken up into four major trading sessions:
          the Sydney session, the Tokyo session, the London session, and the New
          York session.
        </p>

        <img src="/tools/w.png" alt="" />
        <h5>Forex Trading Volume</h5>

        <p>
          You can make money trading when the market moves up, and you can even
          make money when the market moves down. But you will have a very
          difficult time trying to make money when the market doesn&apos;t move at
          all.
        </p>
        <p>
          In order for the market to move, lots of trades need to occur. And
          this is why you should focus your energy during specific trading
          sessions.
        </p>
        <p>
          The forex trading sessions are named after major financial centers and
          are loosely based on the local “work day” of traders working in those
          cities.
        </p>
        <p>
          The more traders…trading, the higher the trading volume, and the more
          active the market.
        </p>

        <p>
          The more active the market, the tighter the spreads you&apos;ll get and the
          less slippage you&apos;ll experience. In a nutshell, you&apos;ll get better
          order execution.
        </p>
        <img src="/tools/r.png" alt="" />
        <h5>When is the best time to trade forex?</h5>
        <p>
          During the weekdays, there’s always at least one forex trading session
          open although there are periods of downtime when the market is really
          quiet and trading volume is low or “thin”.
        </p>
        <p>
          You usually want to avoid trading when only one trading session is
          open and instead, wait for trading sessions to overlap.
        </p>
        <p>
          When two major financial centers are open, the number of traders
          actively buying and selling a given currency greatly increases.
        </p>
        <p>
          The highest trading volume occurs during the overlap of the London and
          New York trading sessions. More than 50% of trading volume occurs at
          these two financial centers.
        </p>
        <img src="/tools/e.png" alt="" />
        <p>
          The best time for you to trade forex will depend on which currency
          pair you’re looking to trade.
        </p>
        <p>
          Most of the trading activity for a specific currency pair will occur
          when the trading sessions of the individual currencies overlap.
        </p>
        <p>
          For example, AUD/JPY will experience a higher trading volume when both
          Sydney and Tokyo sessions are open. And EUR/USD will experience a
          higher trading volume when both London and New York sessions are open.
        </p>

        <h5>How to Trade with the Forex Market Time Zone Converter</h5>

        <p>
          Here are some tips for using the Forex Market Time Zone Converter:
        </p>
        <ul>
          <li>
            Concentrate your trading activity during the trading hours for the
            three busiest trading sessions: Tokyo, London, and New York.
          </li>
          <li>
            Most market activity will occur when one of these three markets
            open.
          </li>
          <li>
            The most active times will occur when two or more trading sessions
            overlap and are open at the same time.
          </li>
        </ul>

        <h5>Frequently Asked Questions about Forex Market Hours</h5>
        <h5>What are the forex market hours?</h5>
        <p>
          The forex market technically never closes, but retail traders can only
          trade the hours between Sunday at 5:00 pm ET and Friday at 5:00 pm ET.
        </p>
        <h5>What time does the forex market open?</h5>
        <p>The forex market opens on Sunday at 5:00 pm ET.</p>
        <h5>What time does the forex market close?</h5>
        <p>The forex market closed on Friday at 5:00 pm ET.</p>
        <h5>What are the forex market sessions?</h5>
        <p>There are four trading sessions in the forex market:</p>
        <ul>
          <li>Sydney is open from 9:00 pm to 6:00 am UTC</li>
          <li>Tokyo is open from 12:00 am to 9:00 am UTC</li>
          <li>London is open from 7:00 am to 4:00 pm UTC</li>
          <li>New York is open from 1:00 pm to 10:00 pm UTC</li>
          <li>Partner Center</li>
          <li>Find a Broker</li>
        </ul>
      </section>
    </div>
  );
}
