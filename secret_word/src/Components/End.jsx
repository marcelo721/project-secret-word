import React from 'react'

//css
import "./End.css"
const End = ({retry, score}) => {
  return (
    <div>
        <h1>game over</h1>
        <h2>Sua pontuação foi : <span>{score}</span></h2>
        <button onClick={retry}>resetar jogo</button>
    </div>
  )
}

export default End