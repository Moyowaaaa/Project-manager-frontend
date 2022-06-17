import React from 'react'
import { DELETE_CLIENT } from '../graphql/mutations'
import { FaTrash }from 'react-icons/fa'
import { gql,useQuery, useMutation } from '@apollo/client'
import { GET_CLIENTS } from '../graphql/queries'

import { GET_PROJECTS } from '../graphql/queries'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const ClientRow = ({client}) => {

 const [deleteClient] = useMutation(DELETE_CLIENT, {
  variables:{ id: client.id},

  //refetch
  refetchQueries:[{query:GET_CLIENTS}, {query:GET_PROJECTS}]

  //update cache
  // update(cache, {data: {deleteClient}}){ 
  //   const {clients} = cache.readQuery({query:GET_CLIENTS})
  //   cache.writeQuery({
  //     query:GET_CLIENTS,
  //     data:{clients: clients.filter(c => c.id !== deleteClient.id)}
  //   })
  // }


 });

 

  return (
    <div>

      <div className=" w-[15rem] h-[15rem] ">
        <div className="bg-[black] text-white h-full shadow-2xl">
          <CardContent className="flex h-5/6 flex-col items-start justify-center">
            <Typography variant="h5" component="h2">
              {client.name}
            </Typography>
            <Typography variant="body2" component="p">
              {client.email}
            </Typography>
            <Typography variant="body2" component="p">
              {client.phone}
            </Typography>
          </CardContent>
          <div className="flex justify-between px-6">
          <button onClick={deleteClient}><FaTrash className="text-[red]"/></button>

          <button>View</button>
          </div>
        
       </div>

      </div>
    

  {/* //   <table>
  //   <tr>
  //   <td>{client.name}</td>
  //   <td>{client.email}</td>
  //   <td>{client.phone}</td>
  //   <td>
  //     <button  className='text-[red]' onClick={deleteClient}>
  //       <FaTrash />
  //     </button>
  //   </td>
  // </tr>
  // </table> */}



  </div>
  )
}

export default ClientRow