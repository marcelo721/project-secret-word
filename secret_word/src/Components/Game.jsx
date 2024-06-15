import React, { useState, useRef } from 'react'

//css 
import "./Game.css"
const Game = ({verifyLetter, pickedWord,pickedCategory,letters,guessedletters,wrongletters,guesses,score}) => {


    const[letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter)
        setLetter("")

        letterInputRef.current.focus()
    }
   
  return (
    <div className="game">
        <p className="points">
            <span>Pontuação : {score}</span>
        </p>

        <h1>Adivinhe a palavra</h1>
        <h3 className="tip">
            dica sobre a palavra : <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas</p>

            <div className="wordContainer">
                {letters.map((letter, i) =>(
                    guessedletters.includes(letter) ?(
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ) )}
            </div>


            <div>
                <p>Tente adivinhar a letra</p>
                <form className='letterContainer' onSubmit={handleSubmit} >
                    <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
                    <button>Jogar! </button>
                </form>
            </div>

            <div className="wrongLetterContain">
                <p>letras Já ultilizadas</p>
                {wrongletters.map((letter, i) => (
                    <span key={i}>{letter},</span>
                ))}
            </div>
        
    </div>
  )
}

export default Game