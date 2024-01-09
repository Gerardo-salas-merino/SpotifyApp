import React, { useEffect, useState } from 'react'
import { SearchIcon } from '../Components/icons/svgs'
import { axiosMusic } from '../utils/configAxios'
import TrackList from '../Components/share/TrackList'
import PrincipalContainer from '../Components/layouts/PrincipalContainer'


const Home = () => {
  const [tracksRecommendations, setTracksRecommendations] = useState([]);
  const [searchTracks, setSearchTracks] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const query= e.target.query.value;
    const limit = e.target.limit.value;

    //el if para mostrar las canciones recomendadas cuando el usuario de enter en el input si es que esta vacio
    if(query === "") return setSearchTracks([]);
    

    axiosMusic.get(`/api/tracks?limit=${limit}&q=${query}`)
      .then(({ data }) => setSearchTracks(data.tracks.items))
      .catch((err) => console.log(err))
  }

  

  useEffect(() => {
    

   axiosMusic.get("/api/tracks/recommendations?seed_genres=rock,latino,metal,reggaeton,piano")
    .then(({ data }) => setTracksRecommendations(data.tracks))
    .catch((err) => console.log(err))
  
  }, [])
  

  return (
    
    <PrincipalContainer>
      <form onSubmit={handleSubmit} className='flex items-center gap-2 bg-white/20 p-3 rounded-xl'>
        <button>
          <SearchIcon />
        </button>

        <input 
          className='bg-transparent outline-none flex-1'
          type='text' 
          placeholder='Buscar...'
          size={10}
          name='query'
          autoComplete='off'

        />

        <select 
          name='limit' 
          className='bg-transparent outline-none [&>option]:text-black'
            
        >
          <option>10</option>
          <option>12</option>
          <option>14</option>
          <option>16</option>
              
        </select>

      </form>

      <TrackList 
        tracks={
          searchTracks.length == 0 ? tracksRecommendations : searchTracks
        } 
        showAddBtn

      />

    </PrincipalContainer>      
         

    
  )
}

export default Home





