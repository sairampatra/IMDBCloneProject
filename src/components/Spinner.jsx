import React from 'react'

function Spinner() {
    return (
      
       <div className='w-full absolute top-0 left-0 h-[420px]'>  
            
       <img  className='w-full  h-[93vh]'src="https://media.tenor.com/SR5EYRIl3qwAAAAM/turtle-spinning.gif" alt=""/>
       <h1  className='flex justify-center text-4xl '>
       <b>LOADING.....</b>
       </h1>
       </div>
    )
}

export default Spinner
