import React from "react";
import SocketContext from '../Context/SocketContext';
import { useContext,useState,useEffect ,useRef} from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import '@xterm/xterm/css/xterm.css';
export default function Terminal()
{
    
    const context=useContext(SocketContext);
    const socket=context.socket;
    const terminalRef=useRef()
    const isRendered=useRef(false);
    useEffect(()=>{
        if(isRendered.current) return;

        isRendered.current=true;
        
        const term= new XTerminal(
            {
                rows:20,
            }
        );
        term.open(terminalRef.current)
        term.onData(data =>{
            console.log(data)
        })
    })
    return(
        <div ref={terminalRef} id="terminal"></div>
    )
}