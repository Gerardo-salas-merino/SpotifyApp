import { useEffect, useState } from 'react'

import PrincipalContainer from '../Components/layouts/PrincipalContainer'
import { axiosMusic } from '../utils/configAxios'
import Cassette from '../Components/playlist/Cassette'

const PlayList = () => {
  const [userPlaylist, setUserPlaylist] = useState([])
  const [playlistName, setPlaylistName] = useState("")

  const playlistByName = userPlaylist.filter((playlist) => playlist.title.toLowerCase().includes(playlistName.toLowerCase()));

  const cassette_height = 180;
  const DELTA_Y = 48;
  const quantityCassettes = playlistByName.length

  const totalHeight = cassette_height + (DELTA_Y * (quantityCassettes -1)) + "px";

  useEffect(() => {
    
    axiosMusic.get("/api/playlists/me")
    .then(({ data }) => setUserPlaylist(data))
    .catch((err) => console.log(err))
    
  }, [])
  
  return (
    <PrincipalContainer>
      <div  className='flex items-center gap-2 bg-white/20 p-3 rounded-xl'>
        <span>
          < SearchIcon />
        </span>

        <input 
          className='bg-transparent outline-none flex-1'
          type='text' 
          placeholder='Buscar...'
          size={10}
          name='query'
          autoComplete='off'
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}

        />
      </div>


      {/* PlayList del usuario */}
      <section 
        style={{height: totalHeight}}
        className='mt-8 grid place-content-center relative'
      >
        {playlistByName.map((playlist, index) => (
          <Cassette 
            key={playlist.id} 
            title={playlist.title} 
            id={playlist.id} 
            index={index}
          />
        ))}

      </section>
    </PrincipalContainer>
  )
}

export default PlayList