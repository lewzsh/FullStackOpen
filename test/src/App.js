import React, { useState } from "react";

// const Display = ({counter}) => <div>{counter}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {

  // const [ counter, setCounter ] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  // const increaseByOne = () => setCounter(counter+1)
  // const decreaseByOne = () => setCounter(counter-1)
  // const setToZero = () => setCounter(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    // <div>
    //   <Display counter={counter} />
    //   <Button 
    //     onClick={increaseByOne}
    //     text="plus" />
    //   <Button 
    //     onClick={setToZero}
    //     text="zero" />
    //   <Button
    //     onClick={decreaseByOne}
    //     text="minus" />
    // </div>
    <div>
      {left}
      <Button 
        onClick={handleLeftClick}
        text="left"/>
      <Button 
        onClick={handleRightClick}
        text="right"/>
      {right}
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}

export default App;
