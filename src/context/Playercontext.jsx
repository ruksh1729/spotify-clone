import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const Playercontext = createContext();

const Playercontextprovider = (props) => {

    const audioref = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

    const [track,settrack] = useState(songsData[1]);
    const [playstatus,setplaystatus] = useState(false);
    const [time,settime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totaltime:{
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioref.current.play();
        setplaystatus(true);
    }

    const pause = () => {
        audioref.current.pause();
        setplaystatus(false);
    }

    const playwithid = async (id)=>{
        await settrack(songsData[id]);
        await audioref.current.play();
        setplaystatus(true);
    }

    const previous = async ()=>{
        if(track.id>0)
        {
            await settrack(songsData[track.id-1]);
            await audioref.current.play();
            setplaystatus(true);
        }

    }

    const next = async ()=>{
        if(track.id<songsData.length-1)
        {
            await settrack(songsData[track.id+1]);
            await audioref.current.play();
            setplaystatus(true);
        }

    }

    const seeksong = async (e)=>{
        audioref.current.currentTime = ((e.nativeEvent.offsetX/seekbg.current.offsetWidth)*audioref.current.duration)        
    }

    useEffect(()=>{
        setTimeout(()=>{

            audioref.current.ontimeupdate = ()=>{
                seekbar.current.style.width = (Math.floor(audioref.current.currentTime/audioref.current.duration*100))+"%"
                settime({
                    currentTime:{
                        second: Math.floor(audioref.current.currentTime%60),
                        minute: Math.floor(audioref.current.currentTime/60)
                    },
                    totaltime:{
                        second: Math.floor(audioref.current.duration%60),
                        minute: Math.floor(audioref.current.duration/60)
                    }
                })
            }

        },1000)
    })

    const contextvalue={
        audioref,
        seekbar,
        seekbg,
        track,
        settrack,
        playstatus,
        setplaystatus,
        time,
        settime,
        play,
        pause,
        playwithid,
        previous,
        next,
        seeksong
    }

    return (
        <Playercontext.Provider value={contextvalue}>
            {props.children}
        </Playercontext.Provider>
    )

}

export default Playercontextprovider;