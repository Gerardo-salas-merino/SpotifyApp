import React, { useState } from 'react'
import { ChangeIcon, PencilIcon } from '../icons/Svgs';
import '../../style.css';
import './PopUp.css';
import TrackList from './TrackList';
import { axiosMusic } from '../../utils/configAxios';
import { resetTracks } from '../../store/slices/playlist.slice';
import { useDispatch } from 'react-redux';


const PopUpPlaylist = ({ isShowPlaylist, tracks }) => {
    const [isShowFront, setIsShowFront] = useState(true);

    const dispatch = useDispatch()

    const handleToggleCassette = () => {
        setIsShowFront(!isShowFront);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.tracks = tracks;

        axiosMusic.post("/api/playlists", data)
        .then(() => {
            e.target.reset()
            dispatch(resetTracks());
            alert("play list creada con exito")
        })     
        .catch((err) => console.log(err))
    }

  return (
    <form
        onSubmit={handleSubmit}
        className={`absolute -bottom-4 translate-y-full bg-primary-light grid gap-2 p-3 px-5 rounded-xl border-secondary transition-all max-w-[279.6px]
            ${isShowPlaylist ? "right-4 " : "-right-full"}
        `}
    >   

        {/* Cassette */}
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
            
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
            className='flex gap-2 mx-auto p-1 px-4 border-2 border-white rounded-full'
            type='button'
            onClick={handleToggleCassette}>
            Lado {isShowFront ? "B" : "A"} <ChangeIcon />
            
        </button>

        {/* Aqui estamos renderizando las canciones */}
        <TrackList  
            tracks={tracks} 
            limitScroll 
            showRemoveTrackIcon
        />

        <button
            type='submit'
            className='flex gap-2 mx-auto p-1 px-5 border-2 border-white rounded-full uppercase'
        >
            Crear
        </button>

    </form>
  )
}

export default PopUpPlaylist