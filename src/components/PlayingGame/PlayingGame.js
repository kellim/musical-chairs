import React, {Component} from 'react'
import { faWalking, faChair, faHandPaper, faTrophy } from '@fortawesome/free-solid-svg-icons'
import ResourceCount from '../ResourceCount'
import GameStatus from '../GameStatus'
import getSongSrc from '../../utils/getSong'
import './PlayingGame.css'

class PlayingGame extends Component {

  constructor(props) {
    super(props)
      this.state = {
        playStatus: 'wait',
        songCurrentTime: 0,
        songStopTime: 0,
        secondsToWait: this.props.secondsBeforeGameStart,
        playersLeft: this.props.playersLeft
      }
      this.audioEl = React.createRef()
      this.startGame = this.startGame.bind(this)
      this.restartGame = this.restartGame.bind(this)
      this.handleAudioTimeUpdate = this.handleAudioTimeUpdate.bind(this)
      this.countdownTimer = null
    }
    
    static defaultProps = {
      songEndBuffer: 7
    }

  componentDidMount() {
    this.startGame()
  }

  componentWillUnmount() {
    this.audioEl.current.pause()
    this.removeAudioEventListener()
    clearInterval(this.countdownTimer)
  }

  startGame() {
    this.addAudioEventListener()
    this.playRound()
  }

  addAudioEventListener() {
    this.audioEl.current.addEventListener('timeupdate', this.handleAudioTimeUpdate)
  }

  removeAudioEventListener() {
    this.audioEl.current.removeEventListener('timeupdate', this.handleAudioTimeUpdate)
  }

  handleAudioTimeUpdate(evt) {
    if (this.state.playStatus !== 'go') return
    if (this.state.songCurrentTime < this.state.songStopTime) {
      this.setState({
        songCurrentTime: Math.floor(evt.target.currentTime)
      })
    } else {
      this.endRound()
      if (this.state.playersLeft >= 2) {
        this.playRound()
      } else {
        this.endGame()
      }
    }
  }

  playRound() {
    const { songEndBuffer, songDuration, maxSecondsInRound, minSecondsInRound } = this.props
    const roundDuration = Math.floor(Math.random() * (maxSecondsInRound - minSecondsInRound + 1)) + minSecondsInRound
    const secondsLeftInSong = (songDuration - songEndBuffer) - this.state.songCurrentTime
    if (roundDuration > secondsLeftInSong) {
      this.resetSong()
    }
    this.countdownTimer = setInterval(() => {
      if (this.state.secondsToWait === 0) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
        this.playSong(roundDuration)
      } else {
         this.setState(st => ({
          secondsToWait: st.secondsToWait - 1
        }))     
      }
    }, 1000)
  }

  playSong(roundDuration) {
    this.setState(st => ({
      playStatus: 'go',
      songStopTime: st.songCurrentTime + roundDuration
    })) 
    this.audioEl.current.play()
  }

  resetSong() {
    this.audioEl.current.currentTime = 0
    this.setState({
      songCurrentTime: 0
    })
  }

  endRound() {
    this.audioEl.current.pause()
    this.setState(st => ({
      playersLeft: st.playersLeft - 1,
      playStatus: 'wait',
      secondsToWait: this.props.secondsBeforeRound
    }))
  }

  endGame() {
    this.setState({
      playStatus: 'over'
    })
    this.resetSong()
    this.removeAudioEventListener()
  }

  restartGame() {
    clearInterval(this.countdownTimer)
    this.audioEl.current.pause()
    this.resetSong()
    this.removeAudioEventListener()
    this.setState({
      secondsToWait: this.props.secondsBeforeGameStart,
      playersLeft: this.props.playersLeft,
      playStatus: 'wait'
    })
    this.startGame()
  }

  render() {
    const { playStatus, playersLeft, } = this.state
    const { selectedSong, handleReturnBtnClick } = this.props
    return (
      <div className="PlayingGame">
        <div className="PlayingGame-info-container">
          <div className="PlayingGame-status">
            <audio ref={this.audioEl} src={getSongSrc(selectedSong.id)} />
            {playStatus === "go" ?
              <GameStatus
                title="Go!"
                iconColor="turquoise"
                faIcon={faWalking}
                text={`Now Playing: ${selectedSong.title}`}
                playStatus={playStatus}
                handleRestartBtnClick={this.restartGame}
                handleReturnBtnClick={handleReturnBtnClick}
              />
            :
              playStatus === "wait" ?
                <GameStatus 
                  title="Wait!"
                  textColor="#dc143c"
                  iconColor="#dc143c"
                  faIcon={faHandPaper}
                  text={`Music starts in ${this.state.secondsToWait} seconds!`}
                  playStatus={playStatus}
                  handleRestartBtnClick={this.restartGame}
                  handleReturnBtnClick={this.props.handleReturnBtnClick}
                />
              :
                <GameStatus 
                  title="Game Over"
                  faIcon={faTrophy}
                  text="Congrats, Winner!"
                  playStatus={playStatus}
                  handleRestartBtnClick={this.restartGame}
                  handleReturnBtnClick={this.props.handleReturnBtnClick}
                />
            }
          </div>
          <div className="PlayingGame-resource-list">
            <ResourceCount numberLeft={playersLeft} faIcon={faWalking} />
            <ResourceCount numberLeft={playersLeft - 1} faIcon={faChair} />
          </div>
        </div>
      </div>
    )
  }
}

export default PlayingGame