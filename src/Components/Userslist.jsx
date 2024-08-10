import React from "react"
import { useState , useEffect ,useContext} from "react";
import SocketContext from '../Context/SocketContext';
export default function Userlist()
{
 const room=localStorage.getItem('room');
 const [play,setPlay]=useState(false);
 const [users,setUsers]=useState([]);
 const context=useContext(SocketContext);
 const socket=context.socket;
 const fetchuser=()=>{
    console.log("user fetching");
    socket.emit("receivedusers",{roomid:room},(response)=>{
        console.log(response);
        setUsers(response.users);
    });
 }
//  useEffect(()=>{
//     socket.emit("receivedusers",{roomid:room},(response)=>{
//         setUsers(response.user);
//     });
    // socket.on("receivedusers", (data) => {
    //      console.log("hjhjghj");
    //      setUsers([...users,data]);
    //   });
//  },[socket])
return(    
    <div>

        <button  onClick={()=>{ fetchuser() ; setPlay(!play)}} className="text-white text-md cursor-pointer bg-[#8576FF] hover:rounded-xl p-1">
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