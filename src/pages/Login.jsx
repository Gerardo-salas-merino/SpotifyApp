import React from 'react'
import ContainerAuth from '../Components/layouts/ContainerAuth'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from "../store/slices/user.slice"

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();   
    const formData = new FormData(e.target);
    //guardamos los valores de los inputs en un objeto con el Object.fromEntries
    const data = Object.fromEntries(formData);
    dispatch(login(data, navigate));

  };


  return (
    <ContainerAuth>
      <div className='hidden md:block'>
        <img 
          className='max-w-[300px]'
          src='/media/img2.png' alt='img' 
        />
      </div>

      <main>

        <form 
          onSubmit={handleSubmit}
          className='grid gap-5'
        >
          <h2 className='text-3xl uppercase font-semibold'>
            Iniciar Sesion
          </h2>

          <label className='grid gap-4'>
            <span className='text-white/60'>Email:</span>
            <input
              name='email' 
              className='bg-transparent border-b border-b-secondary outline-none text-lg' 
              type='email' 
              required
            />

          </label>

          <label className='grid gap-4'>
            <span className='text-white/60'>contraseña:</span>
            <input 
              name='password'
              className='bg-transparent  border-b border-b-secondary outline-none text-lg'
              type='password' 
              required
            />
          </label>

          <button 
            className='rounded-full p-1 bg-purple-500 text-white uppercase font-semibold max-w-max 
            px-8 mx-auto mt-8 shadow-lg shadow-purple-400/30 hover:shadow-xl hover:shadow-purple-400/30 
            hover:tracking-widest transition-all'
          >
            Entrar
          </button>

          <Link  to="/register" className='max-w-max mx-auto text-sm underline'>o crear una cuenta nueva</Link>

        </form>

      </main>
    </ContainerAuth>
  )
}

export default Login