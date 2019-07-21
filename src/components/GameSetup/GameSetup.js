import React, { Component } from 'react'
import './GameSetup.css'
import SongSelector from '../SongSelector'
import NumberInput from '../NumberInput'
import songData from '../../data/songs.json'
import numberInputData from '../../data/numberInputs.json'

class GameSetup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      numberInputs: numberInputData,
      selectedSong: {}
     }
    this.updateNumberInput = this.updateNumberInput.bind(this)
    this.updateSelectedSong = this.updateSelectedSong.bind(this)
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
      selectedSong: songs.filter(song => song.id.toString() === selectedSongId)[0]
    })
  }

  render() {
    const { numberInputs, selectedSong } = this.state
    const { songs } = this.props

    return (
      <div className="GameSetup">
        <h1 className="GameSetup-title">Game Setup</h1>
        <p className="GameSetup-intro">Automate your Musical Chairs game where nobody is left out: the music will play for a random amount of time in each round and give you time to remove chairs/players!</p>
        <SongSelector 
          songs={songs} 
          selectedSong={selectedSong} 
          handleChange={this.updateSelectedSong}
        />
        {numberInputs.map(data => (
          <NumberInput 
            key={data.id}
            inputData={data}
            handleChange={this.updateNumberInput}
          />
        ))}
      </div>
    )
  }
}

export default GameSetup