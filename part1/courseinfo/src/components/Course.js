import React from 'react'

const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />    
            )}
        </div>
    )
}
  
const Total = ({ parts }) => {
    let exercisesSum = parts.reduce((s, p) => s + p.exercises, 0)
    
    return (
        <p>
            <strong>total of {exercisesSum} exercises</strong>
        </p>
    )
}

const Course = ({ course }) => {
    return(<>
    
        <Header name={course.name}/>

        <Content parts={course.parts}/>
        
        <Total parts={course.parts}/>
        
    </>)
} 

export default Course