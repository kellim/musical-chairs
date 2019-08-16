import React from 'react'
import './Error.css'

function Error(props) {

  const { errorMessage } = props

  return (
    <div className="Error">
      <h3 className="Error-message">{errorMessage}</h3>
    </div>
  )
}

export default Error