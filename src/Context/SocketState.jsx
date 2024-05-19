import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import SocketContext from "./SocketContext";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { query } from "firebase/database";
const socket = io.connect("http://localhost:8080",{query:{uid:"name"}});

const SocketState=(props)=>{
    //const [clientsocket,setClientSocket]=useState("");
    const [room,setRoom]=useState("");
    const [collabcode,setCollabCode]=useState("");
    const [selfcode,setSelfCode]=useState("");
    const [chattype,setChattype]=useState(false);
    const [aioutput,setAIoutput]=useState([]);
    const [codeoutput,setCodeOutput]=useState("");
    const [permission,setPermission]=useState(false);
    const [loader,setLoader]=useState(false);
    const [isadmin,setIsAdmin]=useState(false);
    const navigate = useNavigate()
    const createRoom=(roomno)=>{
        if(roomno!== "")
        {
        localStorage.setItem('room',roomno);
        const name=localStorage.getItem('token');
        setRoom(roomno);
        socket.emit("create_room", {roomid:roomno,name:name},(response) => {
            // Handle the response from the server
            console.log('Server response:', response);
            if(response.error)
            {
                console.log("This room is already exist");
                toast.error("This room is already exist");
            }
            else{
                setIsAdmin(true);
                navigate('/codesection');
                toast.success("Room is created successfully");
            }
        });
        
        }
    }
    const joinRoom = (roomid) => {
        try{
        //setClientSocket(socket);
        setRoom(roomid);
        const name=localStorage.getItem('token');
        if (roomid !== "") {
          socket.emit("join_room", {roomid:roomid,name:name},(response) => {
            // Handle the response from the server
            console.log('Server response:', response);
            if(response.error)
            {
                console.log("This room is not exist");
                toast.error("This room is not exist");
            }
            else{
                toast.success("You have joined in room successfully");
                navigate('/codesection');
            }});//emit send and on recieve
          
          //console.log("you have entered the room");
        }
        }catch(err)
        {
            console.log("Cannot join into the room");
        }  
    };
    const getaccess=()=>{
        const name=localStorage.getItem('token');
        socket.emit("access-permission",{name:name,roomid:room});
    }

    const sendpermission=(accessmode,sendername)=>{
        socket.emit("give-permission",{accessmode:accessmode,sendername:sendername});
    }
    const collabteam=(data)=>{
        console.log(data);
        if(data.access==="yes")
        {
        console.log("permission set true");    
        setPermission(true);
        }
        else{
            console.log("permission still false");
        }
    }
    // const sendoncode=(newValue)=>{
    //     console.log("hi");
    //     socket.emit("editorcode", {room,newValue});
    //     setrealcode(newValue);
    // }
    const leaveacc=()=>{
        //setPermission(false);
        const name=localStorage.getItem('token');
        socket.emit("leave-permission",{name:name});
        //console.log(permission);
    }
    const getairesponse=async(data)=>{
        console.log(data);
        setLoader(true);
        const response=await fetch(`http://localhost:8080/aimodel/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({prompt:data}),
        });
        const result = await response.json();
        //console.log(result.response);
        //const record = data + "\n" + result.response;
        const record=result.response;
        setLoader(false);
        setAIoutput(prevaioutput => [...prevaioutput, record]);
    }
    const output=async()=>{
            console.log(selfcode);
            const url = 'https://online-code-compiler.p.rapidapi.com/v1/';
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '886916d19cmsh4b5bf791d26aa46p19828bjsn7fad2c092bc2',
                        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
                    },
                    body: {
                        language: 'cpp17',
                        version: 'latest',
                        code: '#include <iostream> \n using namespace std; \n int main() { \n int x=10; int y=25; int z=x+y; cout<<"Sum of x+y = " << z; }',
                        input: null
                    }
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.text();
                    console.log(result);
                } catch (error) {
                    console.error(error);
                }


            // const url = 'https://online-code-compiler.p.rapidapi.com/v1/';
            // const options = {
            // method: 'POST',
            // headers: {
            //     'content-type': 'application/json',
            //     'X-RapidAPI-Key': '886916d19cmsh4b5bf791d26aa46p19828bjsn7fad2c092bc2',
            //     'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            // },
            // body: {
            //     language: 'cpp',
            //     version: 'GCC 9.1.0',
            //     code: selfcode,
            //     input: null
            // }
            // };

            // try {
            //     const response = await fetch(url, options);
            //     const result = await response.text();
            //     console.log(result);
            //     setCodeOutput(result);
            // } catch (error) {
            //     console.error(error);
            // }
      }
    const logremove=()=>{
        console.log("logout is going on");
        socket.emit("logout-user");
    }
    const setrealcode=(data)=>{
        setCollabCode(data);
        localStorage.setItem('collabcode',data);
    }
    const setoffcode=(data)=>{
        setSelfCode(data);
        localStorage.setItem('selfcode',data);
    }
    const chanechatpage=()=>{
        setChattype(!chattype)
    }
    useEffect(()=>{
        const data=localStorage.getItem('selfcode');
        const data2=localStorage.getItem('collabcode');
        const data3=localStorage.getItem('room');
        setSelfCode(data);
        setCollabCode(data2);
        setRoom(data3);
        
    },[]);
    return(
        <>

            <SocketContext.Provider value={{socket,room,collabcode,selfcode,chattype,aioutput,codeoutput,permission,loader,isadmin,joinRoom,output,setrealcode,setoffcode,chanechatpage,getairesponse,createRoom,getaccess,sendpermission,leaveacc,collabteam,logremove}}>
            {props.children}
            </SocketContext.Provider>

        </>
    )
}
export default SocketState;