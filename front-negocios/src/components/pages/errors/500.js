import React from 'react'
import '../../styles/Errors.css'

import FatalErrorImg from '../../../assets/images/500.png'

export default function FatalError() {
    return (
        <div className='text-center'>

            <h1 className='Error_Text'>Error: 500 Page Unexpected Error</h1>
            <img src={FatalErrorImg} alt='Error 500' className='Error_Image'/>
        </div>
    )
}
