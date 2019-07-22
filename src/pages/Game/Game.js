import React, { Component } from 'react'
import GameSetup from '../../components/GameSetup'
import songData from '../../data/songs.json'
import numberInputData from '../../data/numberInputs.json'

import './Game.css'


class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      numberInputs: numberInputData.map(numInput => ({...numInput, error: ''})),
      selectedSong: {},
      isPlayingSong: false,
      gameStatus: "setup"
     }
    this.updateNumberInput = this.updateNumberInput.bind(this)
    this.updateSelectedSong = this.updateSelectedSong.bind(this)
    this.toggleSongPreview = this.toggleSongPreview.bind(this)
    this.processSetupForm = this.processSetupForm.bind(this)
  }

  static defaultProps = {
    songs: songData
  }

  componentDidMount() {
    this.setState({selectedSong: this.props.songs[0]})
  }

  updateNumberInput(evt) {
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

  updateSelectedSong(evt) {
    const { songs } = this.props
    const selectedSongId = evt.target.value
    this.setState({
      isPlayingSong: false,
      selectedSong: songs.filter(song => song.id.toString() === selectedSongId)[0]
    })
  }

  toggleSongPreview(evt) {
    this.setState(st => ({
      isPlayingSong: !st.isPlayingSong
    }))
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
    console.log(val, min, max)
    if (isNaN(val) || isNaN(min) || isNaN(max)) {
      isValid = false
    } else if (val < min || val > max) {
      isValid = false
    }
    return isValid
  }

  isSelectedSongValid(val) {
    const { songs } = this.props
    console.log(val, val >= 0 && val < songs.length - 1)
    return !isNaN(val) && val >= 0 && val <= songs.length - 1
  }


  render() {
    console.log(this.state)
    return (
      <div className="Game">
        {this.state.gameStatus === "setup" || this.state.gameStatus === "setupError" ?
          <GameSetup 
            selectedSong={this.state.selectedSong}
            isPlayingSong={this.state.isPlayingSong}
            numberInputs={this.state.numberInputs}
            songs={this.props.songs}
            updateNumberInput={this.updateNumberInput}
            updateSelectedSong={this.updateSelectedSong}
            toggleSongPreview={this.toggleSongPreview}
            handleSubmit={this.processSetupForm}
          />
          : 
          <div>GAME WILL GO HERE</div>
        }
      </div>
    )
  }
}

export default Game