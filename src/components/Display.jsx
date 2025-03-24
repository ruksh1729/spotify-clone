import React, { useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import Displayalbum from './Displayalbum'
import { albumsData } from '../assets/assets'
import { useEffect } from 'react'

const Display = () => {

    const displayref = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumid = isAlbum ? location.pathname.slice(-1) : "";
    const bgcolor = albumsData[Number(albumid)].bgColor;
    
    useEffect(()=>{
        if (isAlbum)
        {
            displayref.current.style.background = `linear-gradient(${bgcolor},#121212)`
        }
        else{
            displayref.current.style.background = `#121212`
        }
    })

    return (
        <div ref={displayref} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:mg-0'>
            <Routes>
                <Route path='/' element={<DisplayHome/>} />
                <Route path='/album/:id' element={<Displayalbum/>} />
            </Routes>
        </div>
    )
}

export default Display