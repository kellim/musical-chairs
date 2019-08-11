import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    }

    static defaultProps = {
      songEndBuffer: 7
    }

  componentDidMount() {
    this.startGame()
  }

  componentWillUnmount() {
    this.audioEl.current.pause()
    this.audioEl.current.removeEventListener('timeupdate', () => {})
  }

  startGame() {
    this.addAudioListener()
    this.playRound()
  }

  addAudioListener() {
    this.audioEl.current.addEventListener('timeupdate', evt => {
       if (this.state.songCurrentTime < this.state.songStopTime) {
        this.setState({
          songCurrentTime: Math.floor(evt.target.currentTime)
        })
      } else if (this.state.playStatus === 'go') {
        this.endRound()
        if (this.state.playersLeft >= 2) {
          this.playRound()
        } else {
          this.endGame()
        }
      }
    })
  }

  playRound() {
    const { songEndBuffer, songDuration, maxSecondsInRound, minSecondsInRound } = this.props
    const roundDuration = Math.floor(Math.random() * (maxSecondsInRound - minSecondsInRound + 1)) + minSecondsInRound
    const secondsLeftInSong = (songDuration - songEndBuffer) - this.state.songCurrentTime
    if (roundDuration > secondsLeftInSong) {
      this.resetSong()
    }
    const countdownTimer = setInterval(() => {
      if (this.state.secondsToWait === 0) {
        clearInterval(countdownTimer)
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
    this.audioEl.current.removeEventListener('timeupdate', () => {})
  }

  restartGame() {
    this.audioEl.current.pause()
    this.endGame()
    this.setState({
      secondsToWait: this.props.secondsBeforeGameStart,
      playersLeft: this.props.playersLeft
    })
    this.startGame()
  }

  render() {
    const { playStatus, playersLeft, secondsToWait } = this.state
    const { selectedSong } = this.props
    return (
      <div className="PlayingGame">
        <div className="PlayingGame-info-container">
          <div className="PlayingGame-status">
            <audio ref={this.audioEl} src={getSongSrc(selectedSong.id)} />
            {playStatus === "go" ?
              <>
                <h2 style={{color: "darkcyan"}}>GO</h2>
                <FontAwesomeIcon style={{color: "darkcyan"}} className="PlayingGame-icon" icon={faWalking} />
                <h2>Now Playing: {selectedSong.title} by {selectedSong.artist}</h2>
              </>
            :
              playStatus === "wait" ?
                <>
                  <h2 style={{color: "orangered"}}>STOP</h2>
                  <FontAwesomeIcon style={{color: "orangered"}} className="PlayingGame-icon" icon={faHandPaper} />
                  <div className="PlayingGame-countdown">{secondsToWait}</div>
                </>
              :
                <GameStatus 
                  title="Game Over"
                  faIcon={faTrophy}
                  iconColor="gold"
                  iconSize="10x"
                  text="Congratulations, Winner!"
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