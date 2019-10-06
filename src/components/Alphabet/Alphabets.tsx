import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import Letter, { LetterType } from '../Letters/Letter'
import './Alphabets.css'

interface Props {
    letters: LetterType[]
    onClick(letter: string): void
}

export const Alphabets: FunctionComponent<Props> =({ letters, onClick }) => (
    <ul className="Alphabets">
        {[...letters].map((letter, index) => {
            return (
                <Letter 
                  key={index}
                  letter={letter.letter}
                  disabled={letter.disabled}
                  onClick={onClick}
                  role="button"
                />
            )
        })}
    </ul>
)

Alphabets.propTypes = {
    letters: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}
