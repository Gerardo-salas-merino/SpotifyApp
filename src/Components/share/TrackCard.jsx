import { Link } from 'react-router-dom'
import { AddTrackIcon, PlayIconTrack, RemoveTrackIcon } from '../icons/Svgs'
import { useDispatch } from 'react-redux'
import { addTrack, deleteTrack } from '../../store/slices/playlist.slice'
import { axiosMusic } from '../../utils/configAxios'


const TrackCard = ({ track, showAddBtn, showRemoveTrackIcon, showDeleteTrack, onDeleteTrack, showPlayTrack, onPlayTrack }) => {

    const dispatch = useDispatch()

    const handleAddTrack = () => {
        dispatch(addTrack(track));
    };
 
    const handleDeleteTrack = () => {
        dispatch(deleteTrack(track.id));
    };

    


  return (
    <article className='flex items-center gap-2 hover:bg-white/20 p-1 rounded-md pr-4 transition-colors group'>
        <header>
            <img 
                className='size=[50px] aspect-square rounded-md group-hover:shadow-md group-hover:shadow-black/40 transition-shadow'
                src={track.album.images[2]?.url} 
                alt='img' 
            />
        </header>
        <div className='flex-1'>
            <Link 
                to={`/tracks/${track.id}`}
                className='text-sm font-bold hover:text-secondary transition-colors line-clamp-1'>
                {track.name}
            </Link>

            <ul className='flex gap-2'>
                {track.artists.slice(0, 2).map((artist, index) => (
                    <li key={artist.id}>
                        <Link 
                            to={`/artist/${artist.id}`}
                            className='font-sm text-slate-400 hover:text-secondary transition-colors'
                        >
                            {artist.name} {track.artists.slice(0, 2).length - 1  !== index && ","}
                        </Link>
                    </li>   
                ))}
            </ul>

        </div>

        <div className='flex items-center gap-2'>

            {
                showAddBtn && (
                    <button 
                        type='button'
                        onClick={handleAddTrack}
                    >
                        <AddTrackIcon />
                    </button>
                )
            }

            
            {showRemoveTrackIcon && (

                <button 
                    onClick={handleDeleteTrack}
                    type='button'
                >
                    <RemoveTrackIcon />
                </button>
                )
            }

            {
                showDeleteTrack && (
                    <button 
                    onClick={() => onDeleteTrack(track.id)}
                    type='button'
                >
                    <RemoveTrackIcon />
                </button>

                )
            }

            {
                showPlayTrack &&(
                    <button onClick={() => onPlayTrack(track.spotifyId)}>
                        <PlayIconTrack />
                    </button>
                )
            }

            

        </div>

    </article>
  )
}

export default TrackCard