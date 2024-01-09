import { PencilIcon } from "../icons/Svgs";
import { Link } from "react-router-dom"

const Cassette = ({title, id, index}) => {

    const DELTA_Y = 48;
    const separation = index * DELTA_Y + 'px';
    
  return (
    <Link 
        to={`/playlists/${id}`} 
        className='absolute cursor-pointer left-1/2 -translate-x-1/2 w-[238px] block hover:rotate-3 transition-transform hover:translate-y-2'
        style={{top: separation}}
    >
        <img src='/media/cassette.png' alt='img' />

        <div className='bg-white flex p-1 items-center absolute top-[16px] left-[20px] rounded-md w-[198px] text-sm'>
            <h4 className="text-black flex-1 line-clamp-1">{title}</h4>
            <PencilIcon />
        </div>


    </Link>
  )
}

export default Cassette