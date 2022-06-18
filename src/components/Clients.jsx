import React,{useState, useEffect} from 'react'
import { GET_CLIENTS } from '../graphql/queries'
import { DELETE_CLIENT } from '../graphql/mutations'
import { FaTrash }from 'react-icons/fa'
import { gql,useQuery, useMutation } from '@apollo/client'
import ClientRow from './ClientRow'

import Projects from './Projects'
import { ADD_CLIENT } from '../graphql/mutations'


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';

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

const Clients = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [addClient] = useMutation(ADD_CLIENT, {
      variables: { name, email, phone },
      update(cache, { data: { addClient } }) {
        const { clients } = cache.readQuery({ query: GET_CLIENTS });
  
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: [...clients, addClient] },
        });
      },
    });
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      if (name === '' || email === '' || phone === '') {
        return alert('Please fill in all fields');
      }
  
      addClient(name, email, phone);
      setName('');
      setEmail('');
      setPhone('');
      setOpen(false);
    };

    


  




    const { loading, error, data } = useQuery(GET_CLIENTS)

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :</p>
    


  return (
    <>

    {/* <AddClient /> */}

    <div>
      <Button onClick={handleOpen}>Add User</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={onSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
         
          <TextField id="standard-basic" className='w-full' label="Name" variant="standard" value={name}  onChange={(e) => setName(e.target.value)}  />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="standard-basic" className='w-full' label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Typography>
          <Typography>
          <TextField id="standard-basic" className='w-full' label="Phone" variant="standard"  value={phone}  onChange={(e) => setPhone(e.target.value)} />
          <br></br>
          <button className='my-4 bg-[white] text-[black]' type="submit">Submit</button>
          </Typography>
          </form>
        </Box>
      </Modal>
    </div>



    <div className='mt-4 px-4'>
        {!loading && !error && (


<div>
<h2 className="flex items-start my-4 text-xl">Current Users</h2>
          <div className='flex w-full gap-4 flex-wrap'>

           
                {data.clients.map(client => (
                  <ClientRow key={client.id} client={client} />
                ))}
           </div>
           </div>
        )
            
        
        }
    
    </div>

    </>
  )
}

export default Clients