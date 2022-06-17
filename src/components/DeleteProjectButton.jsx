import React from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'
import {GET_PROJECT} from '../graphql/queries'
import {DELETE_PROJECT} from '../graphql/mutations'



const DeleteProjectButton = ({projectId }) => {
    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables:{ id: projectId},
        onCompleted: () =>  navigate('/'),
        refetchQueries: [{ query: GET_PROJECT }],
    
    })


  return (
    <div>

        <button className='flex p-4 items-center flex justify-center' onClick={deleteProject}>Delete</button>

    </div>
  )
}

export default DeleteProjectButton