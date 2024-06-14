import React from 'react'

//css
import "./End.css"
const End = ({retry}) => {
  return (
    <div>
        <h1>game over</h1>
        <button onClick={retry}>resetar jogo</button>
    </div>
  )
}

export default End