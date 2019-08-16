import React from 'react'
import { Link } from 'react-router-dom'
import songData from '../../data/songs.json'
import './About.css'

function About(props) {

  return (
  <div className="About">
    <h2>About</h2>
    
    <p>Musical Chairs: Automated is a personal project built by <a href="https://kelliblalock.com">Kelli Blalock</a>&nbsp;
     to be able to automate the playing and stopping of music while playing a musical chairs game.</p>
    
    <h3>Code</h3>
    <p>The app is built with React/JavaScript, and you can <a href="https://github.com/kellim/musical-chairs">view the code here</a>.
    The code is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.</p>

    <h3>Songs</h3>
    <p>The app uses the following songs from <a href="https://freepd.com">freepd.com</a>:</p>

    <ul className="About-song-list">
      {songData.map(song => (
        <li key={song.id}>{song.title} by {song.artist}</li>
      ))}
    </ul>
  </div>
  )
}

export default About