import React from "react"
import { useState , useEffect } from "react";
import SocketContext from '../Context/SocketContext';
export default function Userlist()
{

 const [play,setPlay]=useState(false);
 const [users,setUsers]=useState([]);
 const context=useContext(SocketContext);
 const socket=context.socket;
 useEffect(()=>{
    socket.on("receivedusers", (data) => {
         setUsers([...users,data]);
      });
 },[socket])
return(    
    <div>

        <button  onClick={()=>{setPlay(!play)}} className="text-white text-md cursor-pointer bg-[#8576FF] hover:rounded-xl p-1">
            All Users 
        </button>

        {play===true && 

        <div className="z-50 absolute w-24 h-24 bg-slate-700 text-white font-semibold p-1">
            {
                users && 
                users.map((item) => (

                    <div key={item._id} className="flex justify-between gap-1 p-1">
                       <p>{item.name}</p>
                       <p>{item.access}</p>
                       {isadmin===true && <p>remove access</p>}
                    </div>
                    
                ))
            }
        </div>

        }

    </div>
)
}