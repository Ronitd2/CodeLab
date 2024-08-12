import React from "react"
import { useState , useEffect ,useContext} from "react";
import SocketContext from '../Context/SocketContext';
import green from '../assets/green.png';
import red from '../assets/red.png';
export default function Userlist()
{
 const room=localStorage.getItem('room');
 const [play,setPlay]=useState(false);
 const [users,setUsers]=useState([]);
 const context=useContext(SocketContext);
 const socket=context.socket;
 const isadmin=context.isadmin;
 const fetchuser=()=>{
    console.log("user fetching");
    socket.emit("receivedusers",{roomid:room},(response)=>{
        console.log(response);
        setUsers(response.users);
    });
 }

return(    
    <div>

        <button  onClick={()=>{ fetchuser() ; setPlay(true)}} className="text-white text-md cursor-pointer bg-transparent border-[#8576FF] border-2 rounded-xl p-1">
            All Users 
        </button>

        {play===true && 

        <div className="z-50 absolute w-auto h-auto bg-slate-700 text-white font-semibold p-1 rounded-xl">
            
            <p className="cursor-pointer" onClick={()=>{setPlay(false)}}>close</p>
            {
                users && 
                users.map((item) => (

                    <div key={item._id} className="flex justify-between gap-4 p-2 w-auto ">
                       <p>{item.name}</p>
                       {item.access===true ? <img src={green} className="h-4 w-4"></img> : <img src={red} className="h-4 w-4"></img>}
                       {isadmin===true && <p className="cursor-pointer hover:text-blue-100 " onClick={()=>{context.removepermiss(item)}}>remove access</p>}
                    </div>
                    
                ))
            }
        </div>

        }

    </div>
)
}