import React from 'react'
import Error from '../Error'
import './SongSelector.css'

function SongSelector(props) {

  const { songs, selectedSong, handleChange } = props

  return (
    <div className="SongSelector">
      <label htmlFor="songSelector">Song:</label>
      <select 
        id="songSelector"
        name="songSelector"
        value={selectedSong && selectedSong.id}
        onChange={handleChange}
      >
        {songs.map(song => (
          <option key={song.id} value={song.id}>{`${song.title} by ${song.artist}`}</option>
        ))}
      </select>
      {selectedSong && selectedSong.error && 
        <Error errorMessage={selectedSong.error} />
      }
    </div>
    )
}

export default SongSelector