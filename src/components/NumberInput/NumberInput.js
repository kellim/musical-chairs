import React from 'react'
import Error from '../Error'
import './NumberInput.css'

function NumberInput(props) {

  const { inputData, handleChange } = props

  return (
    <div className="NumberInput">
      <label htmlFor={`numberInput${inputData.id}`}>{`${inputData.labelText}:`}</label>
      <input 
        type="number" 
        id={`numberInput${inputData.id}`}
        name={`numberInput${inputData.id}`}
        value={inputData.value}
        min={inputData.min}
        max={inputData.max}
        onChange={handleChange}
      />
      {inputData.error && 
        <Error errorMessage={inputData.error} />
      }
    </div>
  )
}

export default NumberInput