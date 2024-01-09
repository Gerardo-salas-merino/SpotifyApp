import { Link, useParams } from 'react-router-dom'
import PrincipalContainer from '../Components/layouts/PrincipalContainer'
import { useEffect, useState } from 'react'
import { axiosMusic } from '../utils/configAxios'
import TrackList from '../Components/share/TrackList'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";

const ArtistDetail = () => {
  const [artistInfo, setArtistInfo] = useState(null)

 const { id } = useParams()

 useEffect(() => {
   axiosMusic.get(`/api/artists/${id}`)
   .then(({data}) => setArtistInfo(data))
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
            className='rounded-full block mx-auto size-[200px] object-cover'
            src={artistInfo?.images[1].url} 
            alt='' 
          />
        </div>

        <div>
          <h2 className='font-semibold'>
            {artistInfo?.name}
          </h2>

          <ul className='mt-2'>
            <li>Seguidores: {artistInfo?.followers.total}</li>
            <li>Popularidad: {artistInfo?.popularity}</li>

            <li>
              Generos:
              <ul className='flex gap-2 flex-wrap items-center pt-2'>
                
                {artistInfo?.genres.map((genre) => 
                  <li 
                    className='border p-1 px-3 rounded-full uppercase text-sm font-semibold border-purple-400' 
                    key={genre}>
                    
                    
                    {genre}

                  </li>
                )}
              </ul>

            </li>

          </ul>

        </div>

      </header>
      {/* Slider albumes del artista */}
      <section>
        <h3>Albumes del artista</h3>

        <Swiper

          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 15,
            
            },
            500: {
              slidesPerView: 3,
              spaceBetween: 15,
            },

          }}
        >
          

          {artistInfo?.albums.map((album) => (
            <SwiperSlide key={album.id}>

              <article>

                <header className='mb-2'>
                  <img 
                    className='rounded-md size-[120px]'
                    src={album.images[1].url} 
                    alt=''
                  />
                </header>

                <h5 className='text-sm font-semibold line-clamp-1'>
                  {album.name}
                </h5>

                <h6 className='text-sm text-slate-400 line-clamp-1'>
                  {album.artists[0].name}
                </h6>

              </article>

            </SwiperSlide>
            
          ))}

          


        </Swiper>
      </section>



      <TrackList tracks={artistInfo?.songsTop ?? []} showAddBtn/>
    </PrincipalContainer>
  )
}

export default ArtistDetail