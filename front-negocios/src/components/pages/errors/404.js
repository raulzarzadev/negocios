import React from 'react'
import '../components/styles/Errors.css'
import NotFoundImg from '../images/404.png'

export default function NotFound() {
    return (
        <div className='text-center'>

            <h1 className='Error_Text'>Error: 404 Page Not Found</h1>
            <img src={NotFoundImg} alt='Error 404' className='Error_Image'/>
        </div>
    )
}
