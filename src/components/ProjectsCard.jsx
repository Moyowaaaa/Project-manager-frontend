import React,{useState,useEffect} from 'react'


const ProjectsCard = ({project}) => {
  return (


    <div className='w-[20rem] h-[10rem] mb-4 ml-2'>
    <div className="bg-[black] text-white  h-full shadow-2xl flex flex-col items-center justify-center">
        <p>{project.name}</p>
        <br></br>
        <small>{project.status}</small>
        <button className='text-white hover:border-b-2 hover:border-b-[blue] bg-black px-2 py-2'>
        <a href={`/projects/${project.id}`}>
         
            View</a>
            </button>
            
    </div>
    </div>
  )
}

export default ProjectsCard