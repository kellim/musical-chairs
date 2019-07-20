import React from 'react'
import './NumberInput.css'

function NumberInput(props) {

  const { inputData, handleChange } = props

  return (
    <div className="NumberInput">
      <label htmlFor="song-selector">{`${inputData.labelText}:`}</label>
      <input 
        type="number" 
        id={`NumberInput-${inputData.id}`}
        value={inputData.value}
        min={inputData.min}
        max={inputData.max}
        onChange={handleChange}
      >
      </input>
    </div>
  )
}

export default NumberInput