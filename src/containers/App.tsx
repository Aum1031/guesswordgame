import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Alphabets } from './../components/Alphabet/Alphabets'
import GameResult from './../components/GameResult/GameResult'
import TriesLeft from './../components/TriesLeft/TriesLeft'
import { LetterType } from './../components/Letters/Letter'
import NewWord from './../components/NewWord/NewWord'
import Word from './../components/Word/Word'
import './App.css'

interface State {
  alphabets: string
  letters: LetterType[]
  guessedLetters: Set<string>
  guessedTheWord: boolean
  triesLeft: number
  word: LetterType[] | null
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = this.initialState()
    this.selectLetter = this.selectLetter.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
    this.getWordFromApi = this.getWordFromApi.bind(this)
    this.addKeyPressListener()
  }

  initialState(): State {
    const alphabets: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const letters: LetterType[] = Array.from(alphabets).map(letter => ({
      letter,
      disabled: false
    }))

    const word: LetterType[] | null = null
    const guessedLetters: Set<string> = new Set()
    const triesLeft: number = 6
    const guessedTheWord: boolean = false

    return {
      alphabets,
      letters,
      word,
      guessedLetters,
      triesLeft,
      guessedTheWord
    }
  }

  getWordFromApi():void {
    axios.get('http://app.linkedin-reach.io/words')
      .then(response => response)
      .then(
        (result) => {
          const words = result.data.split('\na');
          const word: LetterType[] = Array.from(this.randomWord(words)).map(
            letter => ({
              letter,
              disabled: false
            })
          )
          this.setState({ word });
        },
        (error) => {
          console.log(error)
        }
      )
  }

  componentDidMount(){
    this.getWordFromApi();
  }


  randomWord(words: any[] ): string {
    return words[
      Math.floor(Math.random() * words.length)
    ].toUpperCase()
  }

  selectLetter(selectedLetter: string): void {
    this.updateGameStatus(this.state, selectedLetter)
  }

  updateGameStatus(state: State, selectedLetter: string): void {
    
      if (state.triesLeft > 0 && !state.guessedTheWord) {
        const nextState: State = { ...state }
        const alreadyGuessedLetter: boolean = state.guessedLetters.has(
          selectedLetter
        )
        if(nextState.word){
        if (!alreadyGuessedLetter) {
          nextState.guessedLetters.add(selectedLetter)
          const letter: LetterType | undefined = nextState.letters.find(
            letter => letter.letter === selectedLetter
          )
  
          if (letter) {
            letter.disabled = true
          }
        }
        
        const guessedTheWord: boolean = nextState.word
          .filter(letter => !['-', ' '].includes(letter.letter))
          .every(letter => nextState.guessedLetters.has(letter.letter))
  
        const lettersFoundInWord: boolean =
          nextState.word.filter(letter => letter.letter === selectedLetter)
            .length > 0
  
        if (guessedTheWord) {
          nextState.guessedTheWord = true
        } else if (!alreadyGuessedLetter && !lettersFoundInWord) {
          nextState.triesLeft--
        }
  
        nextState.word.forEach(letter =>
          letter.letter === selectedLetter ? (letter.disabled = true) : ''
        )
  
        this.setState(nextState)
      }
    } 
  }

  startNewGame(): void {
    window.location.reload()
  }

  addKeyPressListener(): void {
    document.addEventListener('keydown', event => {
      const letter: string = event.key.toUpperCase()

      if (this.state.alphabets.includes(letter)) {
        this.selectLetter(letter)
      }
    })
  }

  render() {
    if (!this.state.word) {
      return <div className="fa fa-spinner" aria-hidden="true"></div>;
    }
  
    return (
      <Fragment>
        <p className="info">
          Welcome to play word guess game. Use keyboard to guess the letters.
        </p>
        <Word
          word={this.state.word}
          guessedTheWord={this.state.guessedTheWord}
        />
        <div className="game">
          <TriesLeft triesLeft={this.state.triesLeft} />
          <GameResult
            guessedTheWord={this.state.guessedTheWord}
            guessesLeft={this.state.triesLeft}
          />
          <NewWord onClick={this.startNewGame} />
        </div>
        <Alphabets letters={this.state.letters} onClick={this.selectLetter} />
      </Fragment>
    )
  }
}

export default App
