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

//stages
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
  const [guessedletters, setGuessedleterrs] = useState([]);
  const [wrongletters, setwrongleterrs] = useState([]);
  const [guesses, setguesses] = useState(3);
  const [score, setScore] = useState(0);





  //pick a random category 
  const pickWordAndCategory =useCallback (() =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick a random word
    const word = words[category][Math.floor(Math.random() * Object.keys(words[category]).length)]
      return{word, category}
  },[words])

  //starts the secret word game
  const startGame = useCallback(() =>{

    setGuessedleterrs([])
    setwrongleterrs([])

    //pick word and pick category 
    const{word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())


    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setleterrs(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // process the letter input 
  const verifyLetterIputh = (letter) =>{
    
    const nomalizedLetter = letter.toLowerCase()

    //check if letter has already been utilized 
    if(guessedletters.includes(nomalizedLetter) || wrongletters.includes(nomalizedLetter)){
      return;
    }

    //push guessed letters or remove a guess
    if(letters.includes(nomalizedLetter)){
      setGuessedleterrs((actualGuessedletters) => [
        ...actualGuessedletters,
        nomalizedLetter
      ])
    } else {
      setwrongleterrs((actualWrongLetters)=> [
        ...actualWrongLetters,
        nomalizedLetter
    ])
    num_tentativas()
  }
 
}
const num_tentativas = () =>{
  setguesses(guesses - 1) ;

  if(guesses === 1){
    setGameStage(stages[2].name)
    setGuessedleterrs([])
    setwrongleterrs([])
  }
}

  //restarts the game 
  const retry = () =>{
    setScore(0)
    setguesses(3)
    setGameStage(stages[0].name)
  }


  useEffect(() =>{

    const uniqueLetters = [... new Set(letters)]
    if( guessedletters.length == uniqueLetters.length){
      setScore((actualScore) => actualScore += 100)
      startGame();
    }
  },[guessedletters, letters, startGame])

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen  startGame={startGame}/>}
      {gameStage === "game" && <Game 
        verifyLetter={verifyLetterIputh}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedletters={guessedletters}
        wrongletters={wrongletters}
        guesses={guesses}
        score={score}
        />}

      {gameStage === "end" && <End  retry={retry} score={score}/>}
      
    </div>
    
  )
}
export default App
