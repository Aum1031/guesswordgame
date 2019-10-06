import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import './TriesLeft.css'

interface Props {
 triesLeft: number
}

const TriesLeft: FunctionComponent<Props> = ({ triesLeft }) => {
  const ariaLabel: string = `Tries left: ${triesLeft}`

  return (
    <div className="TriesLeft" aria-label={ariaLabel}>
      Tries Left: {triesLeft}
    </div>
  )
}

TriesLeft.propTypes = {
  triesLeft: PropTypes.number.isRequired
}

export default TriesLeft
