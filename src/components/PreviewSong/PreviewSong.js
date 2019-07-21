import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import './PreviewSong.css'
import beJammin from '../../audio/BeJammin.mp3'
import breakingBollywood from '../../audio/BreakingBollywood.mp3'
import citySunshine from '../../audio/CitySunshine.mp3'
import dancingAtTheInn from '../../audio/DancingAtTheInn.mp3'
import funshine from '../../audio/Funshine.mp3'
import ghostTown from '../../audio/Ghost Town.mp3'
import pickledPink from '../../audio/PickledPink.mp3'
import ukuleleSong from '../../audio/Ukulele Song.mp3'

class PreviewSong extends Component {
  constructor(props) {
    super(props)
    this.state = { songPlayTime: 0}
    this.audioEl = React.createRef()
    this.progressBarEl = React.createRef()
    this.handleClick = this.handleClick.bind(this)
    this.handleProgressBarChange = this.handleProgressBarChange.bind(this)
  }

  componentDidMount() {
    this.progressBarEl.current.value = 0
    this.audioEl.current.addEventListener('timeupdate', evt => {
      this.progressBarEl.current.value = evt.target.currentTime
      this.setState({
        songPlayTime: evt.target.currentTime
      })
    })
  }

  componentWillUnmount() {
    this.audioEl.current.removeEventListener("timeupdate", () => {})
  }

  handleClick() {
    const { isPlayingSong } = this.props
    this.props.toggleSongPreview()
    isPlayingSong ? this.audioEl.current.pause() : this.audioEl.current.play()
  }

  handleProgressBarChange(evt) {
    this.progressBarEl.current.value = evt.target.value
    console.log(this.audioEl.current.currentTime, this.progressBarEl.current.value)
    this.audioEl.current.currentTime = this.progressBarEl.current.value
  }

  getSongSrc() {
    let songSrc
    switch(this.props.selectedSong.id) {
      case 0:
        songSrc = beJammin
        break
      case 1:
        songSrc = breakingBollywood
        break
      case 2:
        songSrc = citySunshine
        break
      case 3:
        songSrc = dancingAtTheInn
        break
      case 4:
        songSrc = funshine
        break
      case 5:
        songSrc = ghostTown
        break
      case 6:
        songSrc = pickledPink
        break
      case 7:
        songSrc = ukuleleSong
        break
      default:
        songSrc = beJammin
        break
    }
    return songSrc
  }

  // Will need to be updated if displaying a time greater than 9:59
  formatSecondsAsTime(seconds) {
    const displayMinutes = Math.floor(seconds / 60)
    const displaySeconds = Math.floor(seconds % 60)
    return `${displayMinutes}:${('0' + displaySeconds).slice(-2)}`
  }
  
  render() {
    const { songPlayTime } = this.state
    const { isPlayingSong, selectedSong } = this.props

    const formattedPlayTime = this.formatSecondsAsTime(songPlayTime)
    const formattedDuration = this.formatSecondsAsTime(selectedSong.duration)
  
    return (
      <div className="PreviewSong">
        <h3>Preview Song</h3>
        <h4>{`${selectedSong.title} by ${selectedSong.artist}`}</h4>
        <div className="PreviewSong-play-container">
          <button  aria-label={isPlayingSong ? "Pause" : "Play"} className="PreviewSong-play-button" onClick={this.handleClick}>
            <FontAwesomeIcon className="PreviewSong-play" icon={isPlayingSong ? faPause : faPlay} />
          </button>
          <audio ref={this.audioEl} src={this.getSongSrc()} />
          <input 
            ref={this.progressBarEl}
            type="range"
            className="PreviewSong-progress-bar"
            min="0"
            step="0.1"
            max={selectedSong.duration}
            onChange={this.handleProgressBarChange}
          />
        </div>
        <div className="PreviewSong-duration">{formattedPlayTime} / {formattedDuration}</div>
      </div>
    )
  }


}

export default PreviewSong