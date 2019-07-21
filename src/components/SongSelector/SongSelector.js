import React from 'react'
import './SongSelector.css'

function SongSelector(props) {

  const { songs, selectedSong, handleChange } = props

  return (
    <div className="SongSelector">
      <label htmlFor="song-selector">Song</label>
      <select className="form-control" id="song-selector" value={selectedSong.id} onChange={handleChange}>
        {songs.map(song => (
          <option key={song.id} value={song.id}>{`${song.title} by ${song.artist}`}</option>
        ))}
      </select>
    </div>
    )
}

export default SongSelector