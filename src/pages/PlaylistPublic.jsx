import PrincipalContainer from '../Components/layouts/PrincipalContainer'
import { useEffect, useState } from 'react';
import TrackList from '../Components/share/TrackList';
import { useParams } from 'react-router-dom';
import { PlusIcon, ShareIcon, ChangeIcon } from '../Components/icons/Svgs';
import { axiosMusic } from '../utils/configAxios';
import PreviewTrack from '../Components/share/PreviewTrack';



const PlaylistPublic = () => {
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [isShowFront, setIsShowFront] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);

  const { id } = useParams();

  const handleToggleCassette = () => {
    setIsShowFront(!isShowFront);
  };

  const handleCopyUrl = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
    .then(() => alert("copiado en el portapapeles"))

  };

  const handlePlayTrack = (spotifyId) => {
    setCurrentTrack(spotifyId)
  }

  useEffect(() => {
    axiosMusic.get(`/api/playlists/${id}`)
    .then(({ data }) => setPlaylistInfo(data))
    .catch((err) => console.log(err))
  }, [])

  return (
    <PrincipalContainer isPublic>

      <div>

        <div className={`relative max-w-max mx-auto cassette ${isShowFront ? "front" : "back"}`}>
              
          {/* Frontal */}
          <div className='relative front'>
            <img src='/media/cassette.png' alt='img' />
            <label className='bg-white flex p-1 items-center absolute top-[16px] left-[20px] rounded-md w-[198px] text-sm'>
              
              <h3 className='text-black line-clamp-1 capitalize'>
                {playlistInfo?.title}
              </h3>
              
            </label>

            

            <button onClick={handleCopyUrl } className='absolute right-14 bottom-4'>
              <ShareIcon />
            </button>

            <button className='absolute right-4 bottom-4'>
              <PlusIcon />
            </button>

          </div>
      
      
          {/* Trasera */}
          <div className='absolute top-0 back'>
            <img src='/media/cassette.png' alt='img' />
            {/* Para */}
            <div className='bg-white flex p-1 items-center absolute top-[16px] left-[20px] rounded-md w-[198px] text-sm'>
             
              <h4 className='text-black line-clamp-1 capitalize'>
                {playlistInfo?.to}
              </h4>
              
            </div>
            {/* text area */}
            <div className='bg-white p-1 items-center absolute top-[50px] left-[20px] rounded-md w-[198px] h-[90px] text-sm overflow-y-auto'>
              
              <p className='text-black capitalize'>
                {playlistInfo?.message}
              </p>
                          
            </div>
          </div>
      
        </div>
      
        <button 
          className='flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full mt-4'
          type='button'
          onClick={handleToggleCassette}>
          Lado {isShowFront ? "B" : "A"} <ChangeIcon />
                  
        </button>
      </div>

      {currentTrack !== null && (

        <PreviewTrack idTrack={currentTrack} />
      )}
      
      
      <TrackList 
        tracks={playlistInfo?.tracks ?? []} 
        showPlayTrack
        onPlayTrack={handlePlayTrack}
        
      />
    </PrincipalContainer>
  )
};

export default PlaylistPublic;