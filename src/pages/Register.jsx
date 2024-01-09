import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ContainerAuth from '../Components/layouts/ContainerAuth';


const BASE_URL = 'https://backend-final-project-dev-tfcg.2.us-1.fl0.io';



const Register = () => {
  
  

  const navigate = useNavigate()
  
  
  


  const handleSubmit = (e) => {
    e.preventDefault();
    
   const formData = new FormData(e.target);

   //guardamos los valores de los inputs en un objeto con el Object.fromEntries
   const data = Object.fromEntries(formData);

    axios.post(BASE_URL + "/api/auth/register", data)
    .then(() => {
      
      alert("Usuario creado exitosamente")
      navigate("/login");
   })
   .catch((err) => console.log(err))

  };

  return (
    <ContainerAuth>

      

      <div className='hidden md:block'>
        <img 
          className='max-w-[300px]'
            src='/media/img1.png' alt='img' 
          />
      </div>

        <main>

          <form 
            onSubmit={handleSubmit}
            className='grid gap-5'
          >
            <h2 className='text-3xl uppercase font-semibold'>
              Cuenta Nueva
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
              <span className='text-white/60'>Nombre usuario:</span>
              <input 
                name='name'
                className='bg-transparent border-b border-b-secondary outline-none text-lg'
                type='text' 
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
              Crear
            </button>

            <Link to="/login" className='max-w-max mx-auto text-sm underline'>o iniciar sesion</Link>

          </form>
        

        </main>

    </ContainerAuth>
  )
}

export default Register