import beJammin from '../audio/BeJammin.mp3'
import breakingBollywood from '../audio/BreakingBollywood.mp3'
import citySunshine from '../audio/CitySunshine.mp3'
import dancingAtTheInn from '../audio/DancingAtTheInn.mp3'
import funshine from '../audio/Funshine.mp3'
import ghostTown from '../audio/Ghost Town.mp3'
import pickledPink from '../audio/PickledPink.mp3'
import ukuleleSong from '../audio/Ukulele Song.mp3'

function getSongSrc(selectedSongId) {
    let songSrc
    switch(selectedSongId) {
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

  export default getSongSrc