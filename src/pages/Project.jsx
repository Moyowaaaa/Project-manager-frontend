import React from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'
import {GET_PROJECT} from '../graphql/queries'
import {DELETE_PROJECT} from '../graphql/mutations'
import ClientInfo from '../components/ClientInfo'
import DeleteProjectButton from '../components/DeleteProjectButton'
import UpdateProject from '../components/UpdateProject'

const Project = () => {
    const {id} = useParams();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables:{ id: id},
    });

    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables: {id}
    });

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :</p>
    

  return (
    <>
    {!loading && !error && (
         <div className='flex flex-col'>

            <Link to='/' className='text-base text-center'>
               Back
            </Link>
         <h1>Project</h1>
 
             <div className='border-2 border-[blue] px-4'>
                {/* <Link to={`/projects/${data.project.id}/edit`} className='text-base text-center'></Link> */}
                <Link to='/'>
                    <button className='p-2 px-6 bg-[red]  text-white'>Back</button>
                </Link>


               <h1>{data.project.name}</h1>
               <p>{data.project.description}</p>
 
 
                 
         
                 </div>

                 <ClientInfo client={data.project.client} />

                  <DeleteProjectButton id={id} projectId={data.project.id}  />

                  <UpdateProject id={id} project={data.project} projectId={data.project.id} />
                 </div>

                 

                 
    )}
   
                
    </>

  )
}

export default Project