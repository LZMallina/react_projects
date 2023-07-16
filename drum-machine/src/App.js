import './App.css';
import React, { Component } from 'react'
import bankOne from './bankOne.js';
import bankTwo from './bankTwo.js'
//bankOne contains the audioclips and key info
//creating a box to contain each sound, key display, and other controls
//clip, volume is passed as props augments into function Box
function Box({ clip, volume, setShow, lightup}) {

//setup a react-based-event using useState() hook const [obj, setObj] = useState(() => ({x: 0, y: 0}));
  const [active, setActive ] = React.useState(false);

//use userEffect() hook to create EventListener to activate playSound()when keyboard is pressed
  React.useEffect(()=> {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown',handleKeyPress)
    } 
  }, {})
  
//create the handleKeyPress function 
  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  }
//create the onClick function for playSounds
  
  const playSound = () => {
    //connect the active vs. inactive state
    setActive(true);
    
    //without a setTimeout React-event function, setActive would remain true once key is pressed
    setTimeout(() => setActive(false), 200);

    //create the audioTag function to pass sounds into audio
    const audioTag = document.getElementById(clip.keyTrigger);
    //set audioTag with a timer and volume control
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setShow((prev) => prev + clip.keyTrigger+" ")
  }

  return ( // btn btn-secondary is bootstrap p-4 = padding of 4px and m-3= margin 3px.<audio /> is pre-exisiting tag in htmp just like div. Change className with {``} so function can be added into the className and pass a props
    <div 
      onClick={playSound}
      className={`btn btn-secondary p-4 m-3 ${active && 'btn-warning'} ${lightup && 'btn-success'}`}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  )
}

//App is the parent
function App() {
  
  //create buttons to access two different sound banks
  const [bank, setBank] = React.useState(bankOne)

  //create volume control with React-event hook
  const [volume, setVolume] = React.useState(1);
  //create an area that show the keys you pressed

  const [show, setShow] = React.useState('');

  //create a speed playback control
  const [speed, setSpeed] = React.useState(0.75);
  
  //color change 
  const [lightup, setLightup] = React.useState(false);

  //create a playback function that replays the keys
  const playBack = () => {
    let index = 0;
    let soundArray = show.split(" ");
    const interval =setInterval(()=>{
    const audioTag = document.getElementById(soundArray[index]);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
      index++;
    setLightup(true);
    },speed*300);
    setTimeout(
      () => clearInterval(interval), 300 * speed * soundArray.length - 1)
    setTimeout(()=>setLightup(false),300 *speed *soundArray.length-1)
  };
    
  return (
    <div className="App">
      <div className="container" id = "drum-machine">
        <h1>Drum Machine</h1>
        <div>
          {bank.map(clip => (
            <Box key={clip.id} clip={clip} volume={volume} setShow={setShow} lightup={lightup}/>
          ))}
          <br /><br />
          <div id="display">
          <h4>Select music bank</h4>
          <div>
          <button className ="btn btn-primary p-2 m-3" onClick ={()=> setBank(bankOne)}>HEATER</button>
          <button className ="btn btn-warning p-2 m-3" onClick ={()=> setBank(bankTwo)}>CHORDS</button>
          </div>
          <br /> <br />
            <h4>Volume</h4>
            <input
              type="range"
              step="0.01"
              onChange ={(e)=>setVolume(e.target.value)}
              value ={volume}
              max="1" min="0"
              className='w-50'
            />
            <br /><br />
            <h3>{show}</h3>
            {/*if show is true then display two buttons. One for clear and the other for playback. */}
            {show && 
              <>
              <button onClick={playBack} className="btn btn-success p-3 m-2">Play</button>
              <button onClick={() =>setShow("")} className="btn btn-danger p-3 m-2">Clear</button>
              <br /><br />
              <h3>Speed control</h3>
              <input
              type="range"
              step="0.01"
              onChange ={(e)=>setSpeed(e.target.value)}
              value ={speed}
              max="1.2" min="0.1"
              className='w-50'
            />
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App