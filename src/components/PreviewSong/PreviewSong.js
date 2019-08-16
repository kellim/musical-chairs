import React, { Component } from 'react'
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
    this.handlePlayBtnClick = this.handlePlayBtnClick.bind(this)
    this.handleProgressBarChange = this.handleProgressBarChange.bind(this)
  }

  componentDidMount() {
    this.progressBarEl.current.value = 0

    // timeupdate keeps firing as the song plays: it determines when the end of song is reached,
    // and as a song plays it updates the song's current time and sets the progress bar to match the current time.
    this.audioEl.current.addEventListener('timeupdate', evt => {
      if (this.audioEl.current) {           // There's an error after clicking the setup form's submit button without this conditional
        if (this.audioEl.current.ended) {
          this.props.updatePreviewSongStatus("stopped")
        } else {
          this.progressBarEl.current.value = evt.target.currentTime
          this.setState({
            songPlayTime: evt.target.currentTime
          })
        }
      }
    })
  }

  componentDidUpdate() {
    // The Game page component handles the state for previewSongStatus and we also need
    // to do some things to reset the song in this component as it uses refs.
    if (this.props.previewSongStatus === 'stopped') {
      this.resetSong()
    }
  }

  componentWillUnmount() {
    this.resetSong()
    this.audioEl.current.removeEventListener("timeupdate", () => {})
  }


  handlePlayBtnClick() {
    const { previewSongStatus } = this.props
    const newStatus = previewSongStatus === "playing" ? "paused" : "playing"
    this.props.updatePreviewSongStatus(newStatus)
    previewSongStatus === "playing" ? this.audioEl.current.pause() : this.audioEl.current.play()
  }

  // When the progress bar is moved, go to the corresponding time in the song.
  handleProgressBarChange(evt) {
    if (this.props.previewSongStatus === "stopped") {
      this.props.updatePreviewSongStatus("paused")
    }
      this.progressBarEl.current.value = evt.target.value
    this.audioEl.current.currentTime = this.progressBarEl.current.value
  }

  resetSong() {
    this.props.updatePreviewSongStatus("paused")
    this.audioEl.current.currentTime = 0
    this.progressBarEl.current.value = 0
    this.audioEl.current.pause()
    this.setState({
      songPlayTime: 0
    })
  }

  // It would be nice to find a better way to handle all the audio files than importing
  // them all into this component and then setting the src like this.
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
    const { previewSongStatus, selectedSong } = this.props

    const formattedPlayTime = this.formatSecondsAsTime(songPlayTime)
    const formattedDuration = this.formatSecondsAsTime(selectedSong.duration)
  
    return (
      <div className="PreviewSong">
        <h3>Preview Song</h3>
        <h4>{`${selectedSong.title} by ${selectedSong.artist}`}</h4>
        <div className="PreviewSong-play-container">
          <button type="button" aria-label={previewSongStatus === "playing" ? "Pause" : "Play"} className="PreviewSong-play-button" onClick={this.handlePlayBtnClick}>
            <FontAwesomeIcon className="PreviewSong-play" icon={previewSongStatus === "playing" ? faPause : faPlay} />
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