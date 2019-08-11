import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './GameStatus.css'

function GameStatus(props) {
  const { title, 
          faIcon,
          iconColor,
          iconSize,
          text,
          playStatus,
          countdownSeconds,
          handleRestartBtnClick,
          handleReturnBtnClick
         } = props
  return (
    <div className="GameStatus">
      <h2 className="GameStatus-title">{title}</h2>
      <FontAwesomeIcon className="GameStatus-icon" icon={faIcon} color={iconColor} size={iconSize} />
      <p className="GameStatus-text">{text}</p>
      <button onClick={handleReturnBtnClick} className="GameStatus-btn">Return To Game Setup</button>
      <button onClick={handleRestartBtnClick} className="GameStatus-btn">Restart Game with Same Settings</button>
    </div>
  )
}
export default GameStatus