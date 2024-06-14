import { useState } from 'react'

//css
import './App.css'

//components
import StartScreen from './Components/StartScreen'
import Game from './Components/Game'
import End from './Components/End'


//react
import { useCallback, useEffect } from 'react'

//data
import {wordsList} from "./data/words"

const stages =[
  {id:1, name : "start"},
  {id:2, name :"game"},
  {id:3, name : "end"}
]

function App() {
  
  const[gameStage, setGameStage] = useState(stages[0].name)
  const[words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setleterrs] = useState([]);

  //pick a random category 
  const pickWordAndCategory = () =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

      //pick a random word
      const word = words[category][Math.floor(Math.random() * Object.keys(category).length)]
      console.log(word)

      return{word, category}
  }


  //starts the secret word game
  const startGame = () =>{

    //pick word and pick category 
    const{word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category)
    console.log(wordLetters)

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setleterrs(letters)

    setGameStage(stages[1].name)
  }

  // process the letter input 
  const verifyLetterIputh = () =>{
    setGameStage(stages[2].name)
  }
  
  //restarts the game 
  const retry = () =>{
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen  startGame={startGame}/>}
      {gameStage === "game" && <Game  verifyLetter={verifyLetterIputh}/>}
      {gameStage === "end" && <End  retry={retry}/>}
    </div>
  )
}
export default App
