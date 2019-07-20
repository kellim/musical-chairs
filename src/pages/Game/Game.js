import React, { Component } from 'react'
import GameSetup from '../../components/GameSetup'
import './Game.css'

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <GameSetup />
      </div>
    )
  }
}

export default Game