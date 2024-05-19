import React, { useState,useEffect,useContext} from "react";
// import io from "socket.io-client";
import SocketContext from '../Context/SocketContext';
import AuthContext from "../Context/AuthContext";
import Firebaseapp from "../Utils/AuthUtils/Firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { ToastContainer} from 'react-toastify';
// const socket = io.connect("http://localhost:8000");

export default function Home(){
    const [roomid,setRoomid]=useState("");
    const [initialroom,setInitialroom]=useState("");
    const auth = getAuth(Firebaseapp);
    const context=useContext(SocketContext);
    const context2=useContext(AuthContext);
    const username=context2.userdetails.email;
    const socket=context.socket;
    const name=localStorage.getItem('token');
    const navigate = useNavigate();
    // const joinRoom = () => {

    //     try{
    //     if (roomid !== "") {
    //       socket.emit("join_room", roomid);//emit send and on recieve
    //       navigate('/codesection')
    //       //console.log("you have entered the room");
    //     }
    //     }catch(err)
    //     {
    //         console.log("Cannot join into the room");
    //     }  
    // };
    // const sendMessage = () => {
    //     socket.emit("room_message", {roomid,message});
    //   };
    useEffect(()=>{
        onAuthStateChanged(auth,(user) => {
            if (user) {
               console.log("user already loged in");
               context2.setloggeduser(user);  
            } else {
              console.log("User is not logged in");
              navigate('/login')
            }
          });
      },[])
    return(
        <>
        <div className=" flex items-center justify-center h-screen w-screen ">
           
           <div className="">
           <div>
           <h1 className="text-2xl text-blue-600 font-bold">hello</h1>
           {name && <p className="text-lg font-semibold mt-2">{name}</p>} 
           <div className="flex gap-4 mt-5">
            <input className="h-10 p-2  rounded-xl bg-[#222831] text-gray-400 "
                placeholder="Room Name..."
                onChange={(e) => {
                setRoomid(e.target.value);
                }}
            />
            <button className="h-10 p-2 bg-[#8576FF]" onClick={()=>{context.joinRoom(roomid)}}> Join Room</button>
            </div>
            <div className="flex gap-4 mt-5">
            <input className="h-10 p-2  rounded-xl bg-[#222831] text-gray-400 "
                placeholder="Room Name..."
                onChange={(e) => {
                setInitialroom(e.target.value);
                }}
            />
            <button className="h-10 p-2 bg-[#8576FF]" onClick={()=>{context.createRoom(initialroom)}}>Create Room</button>
            </div>
            <div className="mt-4">
            <button onClick={()=>{socket.emit("logout-user");context2.logout();}}> Logout</button>
            </div>
            </div>
            </div>
            <ToastContainer />
        </div>
            
        </>
    )
}