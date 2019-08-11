import React, { Component } from 'react'
import GameSetup from '../../components/GameSetup'
import PlayingGame from '../../components/PlayingGame'
import songData from '../../data/songs.json'
import numberInputData from '../../data/numberInputs.json'

import './Game.css'


class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      numberInputs: numberInputData.map(numInput => ({...numInput, error: ''})),
      selectedSong: {},
      // Possible statuses are "stopped", "paused", and "playing" - a song won't stay in "stopped" long,
      // it's needed for the PreviewSong component to know what to do, mainly because it uses refs to play audio.
      previewSongStatus: 'stopped',
      // Possible statuses are "setup", "setupError", "playGame"
      gameStatus: 'setup'
     }

    this.updateNumberInput = this.updateNumberInput.bind(this)
    this.updateSelectedSong = this.updateSelectedSong.bind(this)
    this.updatePreviewSongStatus = this.updatePreviewSongStatus.bind(this)
    this.processSetupForm = this.processSetupForm.bind(this)
    this.resetSetupForm = this.resetSetupForm.bind(this)
    this.returnToSetup = this.returnToSetup.bind(this)
  }

  static defaultProps = {
    songs: songData
  }

  componentDidMount() {
    this.setState({selectedSong: this.props.songs[0]})
  }

  updateNumberInput(evt) {
    // This will match the numeric part of the id
    const id = evt.target.id.match(/\d+/)[0]
    const val = evt.target.value

    this.setState(st => ({
      numberInputs: st.numberInputs
        .map(numberInput => {
          if (numberInput.id.toString() === id) {
            numberInput.value = val
          }
          return numberInput
        })
    }))
  }

  updateSelectedSong(evt, song='0') {
    const { songs } = this.props
    let selectedSongId
    // Defaults to first option in song selector when it's not called by choosing a song
    // via the dropdown, such as when the setup form is reset.
    selectedSongId = evt && evt.target.name === 'songSelector' ? evt.target.value : song
    this.setState({
      previewSongStatus: 'stopped',
      selectedSong: songs.filter(song => song.id.toString() === selectedSongId)[0]
    })
  }

  updatePreviewSongStatus(newStatus) {
    this.setState({
      previewSongStatus: newStatus
    })
  }

  processSetupForm(evt) {
    evt.preventDefault()
    const { numberInputs } = this.state
    this.removeSetupFormErrors()
    let error = false
    let selectedSongVal = parseInt(evt.target['songSelector'].value)
    if (!this.isSelectedSongValid(selectedSongVal)) {
      error = true
      this.setState(st => ({
        selectedSong: {...st.selectedSong, error: 'The chosen song is invalid.'}
      }))
    }
    for (let i = 0; i < numberInputs.length; i++) {
      let val = evt.target['numberInput' + i].value
      let min = numberInputs[i].min
      let max = numberInputs[i].max
      if (!this.isNumberInputValid(val, min, max)) {
        error = true
        this.setState(st => ({
          numberInputs: st.numberInputs.map(numInput => {
            if (numInput.id === i) { numInput.error = `Please enter a number between ${min} and ${max}.` }
            return numInput
          })
        }))
      }
    }
    if (error) {
      this.setState({
        gameStatus: 'setupError'
      })
    } else {
      this.setState({
        gameStatus: 'playGame'
      })
    }
  }

  removeSetupFormErrors() {
    const { numberInputs } = this.state
    for (let i = 0; i < numberInputs.length; i++) {
      this.setState(st => ({
        selectedSong: {...st.selectedSong, error: ''},
        numberInputs: st.numberInputs.map(numInput => {
          numInput.error = ''
          return numInput
        })
      }))
    }
  }

  isNumberInputValid(val, min, max) {
    let isValid = true;
    if (isNaN(val) || isNaN(min) || isNaN(max)) {
      isValid = false
    } else if (val < min || val > max) {
      isValid = false
    }
    return isValid
  }

  isSelectedSongValid(val) {
    const { songs } = this.props
    return !isNaN(val) && val >= 0 && val <= songs.length - 1
  }

  resetSetupForm() {
    this.setState({
      numberInputs: numberInputData.map(numInput => ({...numInput, error: ''})),
    })
    this.updateSelectedSong()
  }

  returnToSetup() {
    this.setState({
      gameStatus: 'setup'
    })
  }

  render() {
    const { selectedSong, numberInputs } = this.state
    return (
      <div className="Game">
        {this.state.gameStatus === 'setup' || this.state.gameStatus === 'setupError' ?
          <GameSetup 
            selectedSong={this.state.selectedSong}
            previewSongStatus={this.state.previewSongStatus}
            numberInputs={this.state.numberInputs}
            songs={this.props.songs}
            updateNumberInput={this.updateNumberInput}
            updateSelectedSong={this.updateSelectedSong}
            updatePreviewSongStatus={this.updatePreviewSongStatus}
            handleSubmit={this.processSetupForm}
            handleResetBtnClick={this.resetSetupForm}
          />
          : 
          <PlayingGame
            selectedSong={selectedSong}
            secondsBeforeGameStart={parseInt(numberInputs[3].value)}
            secondsBeforeResuming={parseInt(numberInputs[5].value)}
            secondsBeforeRound={parseInt(numberInputs[4].value)}
            minSecondsInRound={parseInt(numberInputs[1].value)}
            maxSecondsInRound={parseInt(numberInputs[2].value)}
            songDuration={parseInt(selectedSong.duration)}
            playersLeft={parseInt(numberInputs[0].value)}
            handleReturnBtnClick={this.returnToSetup}
          />
        }
      </div>
    )
  }
}

export default Game