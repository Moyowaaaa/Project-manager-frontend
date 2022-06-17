import React from 'react'
import {FaUser, FaEnvelope, FaPhone} from 'react-icons/fa'

const ClientInfo = ({client}) => {
  return (
    <div>
        <div className='flex flex-col items-center justify-center'>
            <h5>Client Details</h5>
            <p className='flex'><FaUser />{client.name}</p>
            <p className='flex'><FaEnvelope />{client.email}</p>
            <p className='flex'><FaPhone />{client.phone}</p>


            </div>
    </div>
  )
}

export default ClientInfo