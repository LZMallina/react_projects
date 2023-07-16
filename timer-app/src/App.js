import './App.css';
import React from 'react'
import beepSound from './beepSound.mp3'

//Child component function Length that will pass on the break and session length of time
function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h5>{title}</h5>
      <div className="time-sets">
        <h4 style={{ fontSize:30}}>{formatTime(time)}</h4>
        <button className="btn-small cyan darken lighten-2"
          onClick={()=>changeTime(-60,type)}
        >
          <i className = "material-icons">arrow_downward</i>
        </button>
        <button className="btn-small cyan darken lighten-2"
          onClick ={()=>changeTime(60,type)}
        >
          <i className = "material-icons">arrow_upward</i>
        </button>
      </div>   
    </div>
    
  );
}
//Parent component function App
function App() {
  //displayTime is set to 25 minutes
  const [displayTime, setDisplayTime] = React.useState(25*60);
  const [breakTime, setBreakTime] = React.useState(5*60);
  const [sessionTime, setSessionTime] = React.useState(25*60);
  const [timerOn, setTimerOn] = React.useState(false);
  const [timerLabel, setTimerLabel] = React.useState('Session');
  const [breakSound] = React.useState(new Audio(beepSound));
  
  
//format the displayTime
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return ((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds))
  };
  //create the function Change time
  const changeTime = (amount, type) => {
    if (type === "break") {
      if (amount < 0 && breakTime <= 0 ) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    }
    else {
      if (amount < 0 && sessionTime <= 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };
//create a function to control on/off reset of timer.  New Date().getTime() is a javascript library function
  // once he sesion timer is 00:00 then replace session timer label to Break and start the timer (decrement)
  // once the break clock reaches 00:00 the label to session and time switch back to session 

  React.useEffect(() => {


    const switchHandler = () => {
      if (displayTime <= 0 && timerLabel === 'Session') {
        breakSound.play();
        setTimerLabel('Break');
        setDisplayTime(breakTime);
      } else if (displayTime <= 0 && timerLabel === "Break") {
        breakSound.play();
        setTimerLabel("Session");
        setDisplayTime(sessionTime);
      }
    }

    if (timerOn === true) {
      let countDown = window.setInterval(() => {//window.setInterval generated an id that's stored in windows under countDown
        setDisplayTime((timerTime) => {
          switchHandler();
          return timerTime - 1;
        }
        );
      }, 1000);
      return () => window.clearInterval(countDown)
    } else {
    // having else being empty allows me to pause the timer at that point of time; 
    };
    
    
  
    }, [timerOn, displayTime, timerLabel, breakTime, sessionTime, breakSound]);

  
//create a reset function
  const resetTime = () => {
    setDisplayTime(25 *60);
    setBreakTime(5*60);
    setSessionTime(25*60);
  }

  return (
    <div className="App">
      <h3>Pomodoro Clock</h3>
      <div className="container">
        <div id="timer">
         <h5>{timerLabel}</h5> 
          {formatTime(displayTime)}
          <div id="timer-buttons">
            {!timerOn ?
              <button
                className="btn-small cyan darken lighten-2"
                onClick={() => setTimerOn(true)}
              > <i className="material-icons">play_circle_filled</i></button>
              :
              <button
                className="btn-small cyan darken lighten-2"
                onClick={() => setTimerOn(false)}
              > <i className="material-icons">pause_circle_filled</i></button>
            }
          
          <button onClick={resetTime}
            className="btn-small cyan darken lighten-2">
          <i className ="material-icons">autorenew</i>
          </button>
      
          </div>
        </div>
        <h4>Timer</h4>
        <div className="length">
          <div id="break-length">
            <Length
              title={"Break Length"}
              changeTime={changeTime}
              type={'break'}
              time={breakTime}
              formatTime={formatTime} />
      </div>
      <div id = "session-length">
        <Length
              title={"Session Length"}
              changeTime={changeTime}
              type={'session'}
              time={sessionTime}
              formatTime={formatTime} />
      </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
