import './App.css';
import React from 'react';


function App() {

/*This part prevents bad Timmy from breaking the calculator */
  let operators = ['*', "-", '/', '+', "."];
  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
  const [expression, setExpression] = React.useState('');

  const display = (symbol) => {
    
    setExpression((prev) => prev + symbol)
    
    if (expression.match(/^[+*/]/) 
    ) {
      setExpression('')
    }
    if (operators.indexOf(expression[expression.length - 1]) >= 0 &&
       (operators.indexOf (expression[expression.length-2])) >= 0
    ) {
      setExpression("BAD OPERATION")
    }
  /*the functions below allows normal calculation */  
    if (expression[expression.length - 1] === "=") {
        if (/[0-9.]/.test(symbol)) {
          setExpression(symbol)
        } else {
          setExpression(answer + symbol)
        }
    }
  };
  
  const [answer, setAnswer] = React.useState(0);
  const calculate = () => {
    setAnswer(eval(expression))//eval is a javascript library function that's pre-set in the background
    setExpression((prev) => prev + "=")
  };
  //create all clear and clear functions
  const allClear = () => {
    setExpression("");
    setAnswer(0);
  };
  const clear = () => {
    setExpression((prev) => prev.split("").splice(0, prev.length - 1).join(""));
    setAnswer(0);
  };

/*This part connects the keypad to calculator button */
React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown',handleKeyPress)
    }
  }, [display])
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calculate()
    }
    if (e.key === 'Backspace') {
      clear()
    }
    if (operators.indexOf(e.key) >-1 || numbers.indexOf(e.key) >-1)
     {
      display(e.key)
    }
  };
  
/*Below here is where the rendering is.  Above this is where the functions are.*/
  return (
    <div className="App">
      <div className="container">
          <div div id="display">
          {/*disable comand on input will allow display and would not allow people to input anything */}
            <input className ="form-control" id="input" type="text" value={expression} placeholder="" disable />
          <div id="output">{answer}</div>
        </div>
        <br />
        <div className="row">
          <div className="col"onClick={allClear} id="allClear">AC</div>
            <div className="col" onClick={clear} id="clear">C</div>
            <div className="col" onClick={() => display(".")} id="decimal">.</div>
            <div className="col" onClick={() => display("/")} id="divide">/</div>
        </div>
        <div className="row">
          <div className="col" onClick={()=>display("7")} id="seven">7</div>
            <div className="col" onClick={()=>display("8")} id="eight">8</div>
            <div className="col" onClick={() => display("9")} id="nine">9</div>
             <div className="col" onClick={()=>display("*")} id="multiply">x</div>
        </div>
        <div className="row">
          <div className="col" onClick={()=>display("4")} id="four">4</div>
            <div className="col" onClick={()=>display("5")} id="five">5</  div>
            <div className="col" onClick={() => display("6")} id="six">6</div>
            <div className="col" onClick={() => display("+")} id="add">+</div>
          </div>
        <div className="row">
          <div className="col" onClick={()=>display("1")} id="one">1</div>
            <div className="col" onClick={()=>display("2")} id="two">2</div>
            <div className="col" onClick={() => display("3")} id="three">3</div>
            <div className="col" onClick={() => display("-")} id="subtract">-</div>
            </div>
            <div className="row">
            <div className="col" onClick={()=>display("0")} id ="zero">0</div>
            <div className="col" onClick={() => display("-")} id="negative">+/-</div>
            <div className="col" onClick={()=>calculate()} id="equals">=</div>
          </div>
        </div>
      </div>
  );
}

export default App;
