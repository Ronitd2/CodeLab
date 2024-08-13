import React from "react";
import { useState , useEffect ,useContext} from "react";
import SocketContext from '../Context/SocketContext';



export default function TerminalInput(){
    const context=useContext(SocketContext);
    return(
        <div class="w-[100%] h-[100%]">
            <div class="relative w-full min-w-[200px]">
                <textarea
                class="peer h-full min-h-[100px] w-full resize-none rounded-[7px]  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white"
                placeholder=" " onChange={(e)=>{context.inputfunc(e.target.value);console.log(e.target.value)}}></textarea>
                {/* <label
                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Message
                </label> */}
            </div>
        </div>
    )
}
//context.inputfunc(e.target.value);
//onChange={(e)=>{console.log(e.target.value)}}