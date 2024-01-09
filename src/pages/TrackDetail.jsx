import { useEffect, useState } from 'react'
import PrincipalContainer from '../Components/layouts/PrincipalContainer'
import TrackList from '../Components/share/TrackList'
import { Link, useParams } from 'react-router-dom'
import { axiosMusic } from '../utils/configAxios'

const TrackDetail = () => {
  const [trackInfo, setTrackInfo] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    axiosMusic.get(`/api/tracks/${id}`)
    .then(({ data }) => setTrackInfo(data)) 
    .catch((err) => console.log(err))
  }, [])
  

  return (
    <PrincipalContainer>
      <Link className='text-secondary' to={-1}>
        {"< Atras"}
      </Link>
      <header className='xs:grid xs:grid-cols-2 xs:gap-4 xs:items-center py-6'>
        
        <div>
          <img 
            className='rounded-2xlnp block mx-auto size-[200px] object-cover'
            src={trackInfo?.album.images[1].url} 
            alt='' 
          />
        </div>

        <div>
          <h2 className='font-semibold'>
            {trackInfo?.name}
          </h2>

          <ul className='mt-2'>
            <li>{trackInfo?.artists[0].name}</li>
            <li>Album{trackInfo?.album.name}</li>
            <li>Año de salida: {trackInfo?.album.release_date}</li>

          </ul>

        </div> 

      </header>
      <h3>Canciones recomendadas</h3>

      <TrackList tracks={trackInfo?.relatedSongs ?? []} showAddBtn/>
    
    
    </PrincipalContainer>
  )
}

export default TrackDetail