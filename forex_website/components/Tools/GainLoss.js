import classes from "./GainLoss.module.css";
import { useRef, useState, useEffect } from "react";
import CircleIcon from '@mui/icons-material/Circle';

export default function GainLoss() {
  const [startingbalance, setStartingBalance] = useState();
  const [percentagegained, setPercentagegained] = useState();
  const [endingbalance, setEndingbalance] = useState();
  const [gain, setGain] = useState();

  const [gainloss, setGainloss] = useState("Gain");

  const gainlosstoggler = () => {
    if (gainloss === "Gain") {
      setGainloss(() => {
        return "Loss";
      });
    } else {
      setGainloss(() => {
        return "Gain";
      });
    }
  };

  // useEffect(() => {
  //   console.log('rerender')
  // }, [gainloss])

  // if (gainloss === "Gain") {
    // console.log('losssssss')
    // const startingbalancechangehandler = (Event) => {
    //   setStartingBalance(() => {
    //     return Event.target.value;
    //   });
    //   console.log(Event.target.value);
    // };

    // const amountgainedchangehandler = (Event) => {
    //   setGain(Event.target.value);
    //   setPercentagegained(() => {
    //     return (Event.target.value * 100) / startingbalance;
    //   });
    //   setEndingbalance(() => {
    //     return -Number(Event.target.value) + Number(startingbalance);
    //   });
    // };

    // const percentagegainedchangehandler = (Event) => {
    //   setPercentagegained(() => {
    //     return Event.target.value;
    //   });
    //   setGain(() => {
    //     return (Event.target.value * startingbalance) / 100;
    //   });
    //   setEndingbalance(() => {
    //     return (
    //       Number((-1)*((Event.target.value * startingbalance) / 100)) +
    //       Number(startingbalance)
    //     );
    //   });
    // };

    // const endingbalancechangehandler = (Event) => {
    //   setEndingbalance(() => {
    //     return Event.target.value;
    //   });
    //   setGain(() => {
    //     return Event.target.value - startingbalance;
    //   });
    //   setPercentagegained(() => {
    //     return ((Event.target.value - startingbalance) * 100) / startingbalance;
    //   });
    // };
  // }

  // else{

  const startingbalancechangehandler = (Event) => {
    setStartingBalance(() => {
      return Event.target.value;
    });
  };

  const amountgainedchangehandler = (Event) => {
    setGain(Event.target.value);
    setPercentagegained(() => {
      return (Event.target.value * 100) / startingbalance;
    });
    setEndingbalance(() => {
      if(gainloss==='Gain'){
      return Number(Event.target.value) + Number(startingbalance);}
      else{
        return -Number(Event.target.value) + Number(startingbalance);
      }

    });
  };

  const percentagegainedchangehandler = (Event) => {
    setPercentagegained(() => {
      return Event.target.value;
    });
    setGain(() => {
      return (Event.target.value * startingbalance) / 100;
    });
    setEndingbalance(() => {
      if(gainloss==='Gain'){
      return (
        Number((Event.target.value * startingbalance) / 100) +
        Number(startingbalance)
      )}
      else{
        return (
          Number((-1)*(Event.target.value * startingbalance) / 100) +
          Number(startingbalance)
        )
      }
    });
  };

  const endingbalancechangehandler = (Event) => {
    setEndingbalance(() => {
      return Event.target.value;
    });
    setGain(() => {
      return startingbalance - Event.target.value;
    });
    setPercentagegained(() => {
      return (( startingbalance-Event.target.value) * 100) / startingbalance;
    });
  };

// }

  return (
    <div className={classes.gainloss}>
      <section>
        <h1>Gain & Loss Percentage Calculator</h1>
        <h5>Not sure how well (or poorly) your trade went?</h5>
        <p>
          Our gain and loss percentage calculator quickly tells you what
          percentage of the account balance you have won or lost. It also
          estimates a percentage of current balance required to get to the
          breakeven point again.
        </p>
        <h5>First, tell us the required basics</h5>
        <input
          type="number"
          placeholder="My Start Balance"
          onChange={startingbalancechangehandler}
          value={startingbalance}
        />
        <button id="gainloss" onClick={gainlosstoggler}>
        <CircleIcon style={{color:'white'}}/>
          {gainloss}
          <CircleIcon style={{fontSize:'17px'}}/>
        </button>

        <h5> Then, tell us one of these and we&apos;ll tell you the other two</h5>
        <input
          type="number"
          placeholder="Gain/Loss"
          onChange={amountgainedchangehandler}
          value={gain}
        />
        <input
          type="number"
          placeholder="% Gain/Loss"
          onChange={percentagegainedchangehandler}
          value={percentagegained}
        />
        <input
          type="number"
          placeholder="Ending Balance"
          onChange={endingbalancechangehandler}
          value={endingbalance}
        />

        <p className={classes.italic}>
          Fillout the fields above and we&apos;ll tell you how far off from your
          original balance you are based on a percentage.
        </p>
        <h5> Why use it?</h5>
        <p>
          {" "}
          You can use it to understand better how much you have won or lost in
          your trade.
        </p>
        <p>
          {" "}
          If you had a losing trade, you will also know how much you need to
          make in order to get back to breakeven.
        </p>
        <p>
          {" "}
          If you had a winning trade, you will know how much you can afford to
          lose before returning to your starting capital. You might also be
          interested in our position size calculator. It helps traders to limit
          their risk per trade and avoid excessive losses that are usually hard
          to recover.
        </p>
      </section>
    </div>
  );
}
