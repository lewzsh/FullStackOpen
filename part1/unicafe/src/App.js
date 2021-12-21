import React, { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = (good + neutral + bad)
  const avg = all / 3
  const positive = ((good / all) * 100) + '%'

  if (all===0) {
    return (<p>No feedback given.</p>)
  }

  return (
    <div>
      <table><tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={avg}/>
      <StatisticLine text="positive" value={positive}/>
      </tbody></table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickGood = () => setGood(good + 1)
  const onClickNeutral = () => setNeutral(neutral + 1)
  const onClickBad = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={onClickGood}
        text="good" />
      <Button
        onClick={onClickNeutral}
        text="neutral" />
      <Button
        onClick={onClickBad}
        text="bad" />

      <h1>statistics</h1>

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

export default App