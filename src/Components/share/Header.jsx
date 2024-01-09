import { Link } from "react-router-dom"
import { LogoutIcon, PlayIcon, PlaylistIcon } from "../icons/Svgs"
import { useEffect, useState } from "react"
import { logout } from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import PopUpPlaylist from "./PopUpPlaylist";

const Header = ({ isPublic }) => {
    const [isShowAuth, setIsShowAuth] = useState(false);
    const [isShowPlaylist, setIsShowPlaylist] = useState(false);

    const dispatch = useDispatch();

    const tracks = useSelector((store) => store.playlist.tracks);


    const quantitiTracks = tracks.length;


    const hanldeTogglePlaylist = () => {
        setIsShowPlaylist(!isShowPlaylist)
    }

    const handleToggleAuth = () => {
        setIsShowAuth(!isShowAuth)
    }
    const handleLogout = () => {
        dispatch(logout());
    };

    

    useEffect(() => {
      
        if(isShowPlaylist){
            setIsShowAuth(false);
        }
      
    }, [isShowPlaylist]);

    useEffect(() => {
      
        if(isShowAuth){
            setIsShowPlaylist(false);
        }
      
    }, [isShowAuth]);
    

    return (
        <header className={`flex p-4 bg-primary-dark items-center relative ${isPublic ? "justify-center" : "justify-between"}`}>
            
            <Link to="/" className='uppercase font-semibold'>Git Music</Link>

            {!isPublic && (
                <div className='items-center flex gap-2'>
                    <button 
                        onClick={handleToggleAuth}
                        className='uppercase p-1 px-4 hover:bg-primary-light
                        rounded-full border border-secondary font-semibold'>
                        
                        Mi cuenta
                    </button>

                    <button onClick={hanldeTogglePlaylist}
                        className='uppercase p-1 px-4 hover:bg-primary-light
                        rounded-full border border-secondary flex gap-2 items-center font-semibold'>
                        <PlaylistIcon /> <span className='hidden sm:inline'>Grabando</span> 
                        {quantitiTracks}

                    </button>
                </div>
                
            )}

            {/* PopUp Auth */}
            <div 
                className={`absolute -bottom-4 translate-y-full bg-primary-light grid gap-2 p-3 px-5 rounded-xl border-secondary border ${isShowAuth ? "right-4" : "-right-full"} transition-all`}>
                
                <Link to="/playlist" className="uppercase flex items-center gap-1">
                    <PlayIcon />
                    Mis grabaciones
                </Link>

                <button
                    onClick={handleLogout}
                    className="uppercase flex items-center gap-1"
                >   
                    <LogoutIcon />
                    Cerrar Sesion
                </button>
            </div>

            <PopUpPlaylist 
                tracks={tracks}
                isShowPlaylist={isShowPlaylist}
            
            />

        </header>
    )
}

export default Header