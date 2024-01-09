import Header from '../share/Header';

const PrincipalContainer = ({ children, isPublic = false }) => {
  return (
    <section className='bg-dark text-white h-screen overflow-auto 
      font-urbanist
      bg-[url(/media/bgMobile.png)] md:bg-[url(/media/bgDesktop.png)] bg-no-repeat bg-right-bottom grid grid-rows-[auto_1fr] overflow-x-hidden'>

      
       
      <Header isPublic={isPublic} />
      
       <section className='p-4 '>
            <main className='bg-primary-dark p-8 px-4 rounded-3xl mt-12 max-w-[562px] mx-auto sm:px-16'>
              {children}
            </main>
        </section>

    </section>
       
  )
}

export default PrincipalContainer