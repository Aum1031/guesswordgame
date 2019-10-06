import React, { Fragment, FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import Letter, { LetterType } from '../Letters/Letter'
import './Word.css'

interface Props {
  guessedTheWord: boolean
  word: LetterType[]
}

const Word: FunctionComponent<Props> = ({ guessedTheWord, word }) => {
  const ariaLabel: string = getAriaLabel(word, guessedTheWord)
  const ariaDescribedBy: string = 'word-description'

  return (
    <Fragment>
      <ul
        className="Word"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      >
        {[...word].map((letter, index) => (
          <Letter
            key={index}
            letter={letter.letter}
            disabled={letter.disabled}
            onClick={() => {}}
          />
        ))}
      </ul>
    </Fragment>
  )
}

const getAriaLabel = (word: LetterType[], guessedTheWord: boolean): string => {
  const pronouncedWord = guessedTheWord
    ? word
    : [...word]
        .map((letter, index) => (letter.disabled ? letter.letter : 'blank'))
        .join(', ')

  return `Word: ${pronouncedWord}`
}

Word.propTypes = {
  guessedTheWord: PropTypes.bool.isRequired,
  word: PropTypes.array.isRequired
}

export default Word
