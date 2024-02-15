import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds < 0) {
      alert("fill all the fields");
      setIsStart(false);
    } else {
      setIsStart(true);
    }
  };

  const handleResume = () =>{
    setIsPaused(false)
    runTimer(seconds,minutes,hours)
  }
 
  const handlePause = () =>{
    setIsPaused(true);
    clearInterval(timerId);



  }

  const handleReset = () => {
    setIsStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId)
  };

  const handleInput = (e) => {
    console.log(e.target.value, e.target.id);
    const value = Number(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  const runTimer = (sec, min, hours, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }
    // console.log(sec);
    if (hours == 0 && minutes == 0 && seconds == 0) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);

      clearInterval(tid);
      alert("times up..!!");
    }
  };

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
        // if i changed the pattern of sec,hr,min then it is not working properly.
      }, 1000);
      setTimerId(tid);
    }

    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minutes, seconds]);
  console.log(hours, minutes, seconds);

  return (
    <div>
      <h1>Countdown Timer</h1>

      {!isStart && (
        <div className="input-container">
          <div className="input-box">
            <input onChange={handleInput} id="hours" placeholder="HH" />
            <input onChange={handleInput} id="minutes" placeholder="Min" />
            <input onChange={handleInput} id="seconds" placeholder="Sec" />
          </div>
          <button className="timer-btn" onClick={handleStart}>
            Start
          </button>
        </div>
      )}

      {isStart && (
        <div className="show-container">
          <div className="timer-box">
            <div> {hours < 10 ? `0${hours}` : hours} </div>
            <span>:</span>
            <div> {minutes < 10 ? `0${minutes}` : minutes} </div>
            <span>:</span>
            <div> {seconds < 10 ? `0${seconds}` : seconds} </div>
          </div>
          <div className="action-box">
           {
            !isPaused && (<button onClick={handlePause} className="timer-btn">Pause</button>)
           }
           {
            isPaused && (<button onClick={handleResume} className="timer-btn">Resume</button>)
           }

            <button className="timer-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
