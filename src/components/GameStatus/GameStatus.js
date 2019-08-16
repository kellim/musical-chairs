import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './GameStatus.css'

function GameStatus(props) {
  const { title,
          textColor, 
          faIcon,
          iconColor,
          iconSize,
          iconAnimation,
          text,
          playStatus,
          countdownSeconds,
          handleRestartBtnClick,
          handleReturnBtnClick
         } = props
  return (
    <div className="GameStatus">
      <h2 className="GameStatus-title" style={{color: textColor}}>{title}</h2>
      <FontAwesomeIcon className={`GameStatus-icon fa-${iconAnimation}`} icon={faIcon} color={iconColor} />
      <p className="GameStatus-text" style={{color: textColor}}>{text}</p>
      <button onClick={handleReturnBtnClick} className="GameStatus-btn">Return To Game Setup</button>
      <button onClick={handleRestartBtnClick} className="GameStatus-btn">Restart Game</button>
    </div>
  )
}

GameStatus.defaultProps = {
  textColor: "darkcyan",
  iconColor: "gold",
  iconAnimation: ""
}

export default GameStatus