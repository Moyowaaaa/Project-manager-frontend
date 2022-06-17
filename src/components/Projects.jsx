import React,{useState} from 'react'
import { gql,useQuery, useMutation } from '@apollo/client'
import ProjectsCard from './ProjectsCard'
import { GET_PROJECTS } from '../graphql/queries'

import { ADD_PROJECT } from '../graphql/mutations'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GET_CLIENTS } from '../graphql/queries'


const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS)
    const {  data:dataR, loading:loadingR, error:errorR, } = useQuery(GET_CLIENTS);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');


    const [addProject] = useMutation(ADD_PROJECT, {
      variables: { name, description, clientId },
      update(cache, { data: { addProject } }) {
        const { projects } = cache.readQuery({ query: GET_PROJECTS });
        cache.writeQuery({
          query: GET_PROJECTS,
          data: { projects: [...projects, addProject] },
        });
      },
    });

    const onSubmit = (e) => {
      e.preventDefault();
  
      if (name === '' || description === '' || clientId === '') {
        return alert('Please fill in all fields');
      }
  
      addProject(name, description, clientId);
  
      setName('');
      setDescription('');
      // setStatus('new');
      setClientId('');
      setOpen(false);
    };


    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :</p>

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


    
  return (
    <div className='h-max border-2 border-[blue]'>

<Button onClick={handleOpen}>New Project</Button>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={onSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField id="standard-basic" className='w-full' label="Name" variant="standard"  value={name}  onChange={(e) => setName(e.target.value)}  />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="standard-basic" className='w-full' label="Description" variant="standard"  value={description}  onChange={(e) => setDescription(e.target.value)}  />
          </Typography>
          <Typography>
          <select className='w-full mt-4 outline-none' value={clientId} onChange={(e) => setClientId(e.target.value)}>
                {dataR.clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                ))}
                </select>

                <br></br>
          <button className='my-4 bg-[white] text-[black]' type="submit">Submit</button>
          </Typography>
          </form>
        </Box>
      </Modal>

      <h2 className="flex items-start my-4 ml-4 text-xl">Active Projects</h2>
        {data.projects.length > 0 ? (
             <div className='flex flex-wrap px-4'>
             {data.projects.map(project => (
                 
                 <ProjectsCard key={project.id} project={project} />
             ))}
            
         </div>   
        ) : (<p>No projects</p>)}
           

        </div>
  )
}

export default Projects