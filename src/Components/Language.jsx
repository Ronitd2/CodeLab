import React from "react"
import { useState , useEffect ,useContext} from "react";
import SocketContext from '../Context/SocketContext';
export default function Language()
{
 const context=useContext(SocketContext);
 const socket=context.socket;
 const isadmin=context.isadmin;
 const [lang,setLang]=useState('C++');
 const [play,setPlay]=useState(false);
 const setprogram=(data)=>{
    setLang(data);
    context.setprogramlang(data);
    setPlay(false);
 }

return(    
    <div>

        <button  onClick={()=>{setPlay(true)}} className="text-white text-md cursor-pointer bg-transparent border-[#8576FF] border-2 rounded-xl p-2 flex justify-center gap-2">
            <p>select language - </p>
            {lang && <p>{lang}</p>}
        </button>

        {play===true && 

        <div className="z-50 absolute w-auto h-auto bg-slate-700 text-white font-semibold p-2 rounded-xl">
            
            <ul>
                <li  className="cursor-pointer" onClick={()=>{setprogram("C")}}>C</li>
                <li  className="cursor-pointer" onClick={()=>{setprogram("C++")}}>C++</li>
                <li  className="cursor-pointer" onClick={()=>{setprogram("Java")}}>Java</li>
                <li  className="cursor-pointer" onClick={()=>{setprogram("Python")}}>Python</li>
                <li  className="cursor-pointer" onClick={()=>{setprogram("Javascript")}}>Javascript</li>
            </ul>
            
        </div>

        }

    </div>
)
}