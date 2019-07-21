import React, { Component } from 'react'
import GameSetup from '../../components/GameSetup'
// import SongSelector from '../SongSelector'
// import NumberInput from '../NumberInput'
// import PreviewSong from '../PreviewSong'
import songData from '../../data/songs.json'
import numberInputData from '../../data/numberInputs.json'

import './Game.css'


class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      numberInputs: numberInputData,
      selectedSong: {},
      isPlayingSong: false
     }
    this.updateNumberInput = this.updateNumberInput.bind(this)
    this.updateSelectedSong = this.updateSelectedSong.bind(this)
    this.toggleSongPreview = this.toggleSongPreview.bind(this)
  }

  static defaultProps = {
    songs: songData
  }

  componentDidMount() {
    this.setState({selectedSong: this.props.songs[0]})
  }

  updateNumberInput(evt) {
    const id = evt.target.id.split('-').pop()
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


  render() {
    console.log(this.state)
    return (
      <div className="Game">
        <GameSetup 
          selectedSong={this.state.selectedSong}
          isPlayingSong={this.state.isPlayingSong}
          numberInputs={this.state.numberInputs}
          songs={this.props.songs}
          updateNumberInput={this.updateNumberInput}
          updateSelectedSong={this.updateSelectedSong}
          toggleSongPreview={this.toggleSongPreview}
        />
      </div>
    )
  }
}

export default Game