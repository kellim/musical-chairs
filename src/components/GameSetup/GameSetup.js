import React, { Component } from 'react'
import './GameSetup.css'
import SongSelector from '../SongSelector'
import NumberInput from '../NumberInput'
import PreviewSong from '../PreviewSong'

class GameSetup extends Component {

  render() {
    const { 
      numberInputs,
      selectedSong,
      isPlayingSong,
      songs,
      updateSelectedSong,
      toggleSongPreview,
      updateNumberInput,
    } = this.props

    return (
      <div className="GameSetup">
        <h1 className="GameSetup-title">Game Setup</h1>
        <p className="GameSetup-intro">Automate your Musical Chairs game so that nobody is left out:
          music will play for a random amount of time in each round and give you time between
          rounds to remove players and chairs!</p>
        <form className="GameSetup-form" onSubmit={this.props.handleSubmit} noValidate>
          <SongSelector 
            songs={songs} 
            selectedSong={selectedSong} 
            handleChange={updateSelectedSong}
          />
          {selectedSong && !selectedSong.error && 
            <PreviewSong 
              selectedSong={selectedSong}
              toggleSongPreview={toggleSongPreview}
              isPlayingSong={isPlayingSong}
            />
          }
          {numberInputs.map(data => (
            <NumberInput 
              key={data.id}
              inputData={data}
              handleChange={updateNumberInput}
            />
          ))}
          <div className="GameSetup-btn-container">
            <button className="GameSetup-btn" id="GameSetup-js-reset-btn">Reset to Defaults</button>
            <button className="GameSetup-btn" type="submit">Let's Go!</button>

          </div>
          
        </form>
      </div>
    )
  }
}

export default GameSetup