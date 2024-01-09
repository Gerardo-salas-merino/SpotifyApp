import PrincipalContainer from '../Components/layouts/PrincipalContainer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DeleteIcon, PencilIcon, SaveIcon, ShareIcon, ChangeIcon } from '../Components/icons/Svgs'
import React, { useEffect, useRef, useState } from 'react'
import { axiosMusic } from '../utils/configAxios'
import TrackList from '../Components/share/TrackList'


const PlaylistDetail = () => {
  const [isShowFront, setIsShowFront] = useState(true);
  const [playlistInfo, setPlaylistInfo] = useState(null)
  const { id } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate()


  const handleToggleCassette = () => {
    setIsShowFront(!isShowFront);
  };

  const handleDeletePlayList = () => {
    axiosMusic.delete(`/api/playlists/${id}`)
    .then(() => {
      alert("Playlist eliminada correctamente")
      navigate("/playlists")})
    .catch((err) => console.log(err))
  };

  const handleDeleteTrackByPlayList = (idTrack) => {
    axiosMusic.delete(`/api/playlists/${id}/tracks/${idTrack}`)
    .then(() => {
      const newTracks = playlistInfo.tracks.filter((track) => track.id !== idTrack);
      const newPlayListInfo = { ...playlistInfo, tracks: newTracks}
      alert("Cancion eliminada correctamente")
      setPlaylistInfo(newPlayListInfo)
    })
    .catch((err) => console.log(err))
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    axiosMusic.patch(`/api/playlists/${id}`, data)
    .then(() => alert("Playlist actualizada correctamente"))
    .catch((err) => console.log(err))

  }


  useEffect(() => {

    if(playlistInfo){
      //? Aqui ya tengo la certeza de que ya hay informacion en el estado
      formRef.current.title.value = playlistInfo.title;
      formRef.current.to.value = playlistInfo.to;
      formRef.current.message.value = playlistInfo.message;
    }
    
  }, [playlistInfo]);
  
  

  useEffect(() => {
    axiosMusic.get(`/api/playlists/${id}`)
    .then(({ data }) => setPlaylistInfo(data))
    .catch((err) => console.log(err))
  }, [])
  


  return (
    <PrincipalContainer>
      <Link 
        className='text-secondary'
        to={-1}>
        {"< Atras"}
      </Link>


      <form  onSubmit={handleSubmit} ref={formRef}>
        <div className={`relative max-w-max mx-auto cassette ${isShowFront ? "front" : "back"}`}>
              
          {/* Frontal */}
          <div className='relative front'>
            <img src='/media/cassette.png' alt='img' />
            <label className='bg-white flex p-1 items-center absolute top-[16px] left-[20px] rounded-md w-[198px] text-sm'>
              <input 
                className='outline-none bg-transparent text-black'
                type="text" 
                placeholder='Titulo'
                name='title'
                onFocus={() => setIsShowFront(true)}
                required
                          
              />
              <PencilIcon />
            </label>

            <button type='submit' className='absolute left-4 bottom-4'>
              <SaveIcon />
            </button>

            <button onClick={handleDeletePlayList} type='button' className='absolute left-14 bottom-4'>
              <DeleteIcon />
            </button>

            <Link to={`/playlists/public/${id}`} className='absolute right-4 bottom-4'>
              <ShareIcon />
            </Link>

          </div>
      
      
          {/* Trasera */}
          <div className='absolute top-0 back'>
            <img src='/media/cassette.png' alt='img' />
            <label className='bg-white flex p-1 items-center absolute top-[16px] left-[20px] rounded-md w-[198px] text-sm'>
              <input 
                className='outline-none bg-transparent text-black'
                type="text" 
                placeholder='Para: '
                name='to'
                onFocus={() => setIsShowFront(false)}
                required
                              
              />
              <PencilIcon />
            </label>
            {/* text area */}
            <label className='bg-white flex p-1 items-center absolute top-[50px] left-[20px] rounded-md w-[198px] text-sm'>
              <textarea
                className='outline-none bg-transparent text-black resize-none w-full'
                type="text" 
                placeholder='Mensaje:'
                rows={4}
                name='message'
                onFocus={() => setIsShowFront(false)}
                required
                              
              />
                          
            </label>
          </div>
      
        </div>
      
        <button 
          className='flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full mt-4'
          type='button'
          onClick={handleToggleCassette}>
          Lado {isShowFront ? "B" : "A"} <ChangeIcon />
                  
        </button>
      </form>
      
      
      <TrackList 
        tracks={playlistInfo?.tracks ?? []} 
        showDeleteTrack
        onDeleteTrack={handleDeleteTrackByPlayList}

      />



    </PrincipalContainer>
  
  
  
  )
}

export default PlaylistDetail;