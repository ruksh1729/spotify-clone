import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/display";
import { Playercontext } from "./context/Playercontext";

const App = () => {
  
  const {audioref,track} = useContext(Playercontext);
  
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar/>
        <Display/>
      </div>
      <Player/>
      <audio ref={audioref} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App
