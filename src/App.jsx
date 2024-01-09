import './App.css'
import PrivateRoutes from './Components/auth/PrivateRoutes'
import ArtistDetail from './pages/ArtistDetail'
import Home from './pages/Home'
import Login from './pages/Login'
import Page404 from './pages/Page404'
import PlayList from './pages/PlayList'
import PlaylistDetail from './pages/PlaylistDetail'
import PlaylistPublic from './pages/PlaylistPublic'
import Register from './pages/Register'
import TrackDetail from './pages/TrackDetail'
import { Routes, Route } from 'react-router-dom'

function App() {
 

  return (
    <>

     

      {/* Mis rutas definidas */}
      <Routes>

        {/* Rutas publicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playlists/public/:id" element={<PlaylistPublic />} />
        
        
        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />} >

          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<PlayList />} />
          {/* El id es un argumento que sera una ruta dinamica */}
          <Route path="/playlists/:id" element={<PlaylistDetail />} />
          <Route path="/tracks/:id" element={<TrackDetail />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
        
        </Route>

        <Route path='*' element={<Page404 />} />

        
        

        


      </Routes>

    </>
  )
}

export default App
