
import {FaList, FaPlus} from 'react-icons/fa'
import { useMutation,useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../graphql/queries'
import { UPDATE_PROJECT } from '../graphql/mutations'
import React,{useState,useEffect} from 'react'
import { GET_CLIENTS } from '../graphql/queries'
import { GET_PROJECT } from '../graphql/queries'

const UpdateProject = ({project}) => {

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    // const [status, setStatus] = useState('');'

    
  
    const [updateProject] = useMutation(UPDATE_PROJECT, {
      variables: { id: project.id, name, description },
      refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    });
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      if (!name || !description) {
        return alert('Please fill out all fields');
      }
  
      updateProject(name, description);
    };
  
  return (
    <>

<div className='flex flex-col'>
                <form onSubmit={onSubmit}>
            <label>Name</label>
            <input type='text' value={name}  onChange={(e) => setName(e.target.value)} />
            <br></br>
            <label>description</label>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            <br></br>
            {/* <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
            </select> */}
            <br></br>
            {/* <label>Client</label>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                {data.clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                ))}
                </select> */}
            <button type="submit">update</button>
            </form>
        </div>
    
  
         

    </>
  )
}

export default UpdateProject