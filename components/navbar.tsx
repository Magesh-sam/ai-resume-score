import React from 'react'
import { ThemeBtn } from './theme-btn'

function Navbar() {
    return (
        <nav className=' flex justify-center items-center p-3 gap-5'>
            <h1 className='text-3xl'>✨ AI Resume Score</h1>
            <ThemeBtn />
        </nav>
    )
}

export default Navbar