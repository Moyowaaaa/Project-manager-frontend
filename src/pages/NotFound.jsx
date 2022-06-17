import React from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <div className='flex flex-col jusitfy-center items-center mt-12'>

            <FaExclamationTriangle size='5em'/>
            <p>Sorry This Page doesnt exist</p>
            <Link to='/'>Back</Link>
        </div>
        </div>
  )
}

export default NotFound