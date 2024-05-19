import React from "react";
import send from "../assets/send-message.png";
import play from "../assets/play.png";
import { useContext,useState,useEffect } from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocketContext from '../Context/SocketContext';
import Messagebox from "../Utils/Messagebox";
import geminilogo from "../assets/gemini.png";
import CodeEditor from "../Components/CodeEditor";
import SelfEditor from "../Components/SelfEditor";
import AuthContext from "../Context/AuthContext";
import { Slide } from "react-awesome-reveal";
import BardAI from "../Components/BardAI";
export default function CodeSection(){
    const [message,setMessage]=useState("");
    // const [messageReceived,setMessageReceived]=useState("");
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [accessreq,setAccessreq]=useState(false);
    const [accessender,setAccessender]=useState("");
    
    const context2=useContext(AuthContext);
    const context=useContext(SocketContext);
    const chattype=context.chattype;
    const codeoutput=context.codeoutput;
    const socket=context.socket;
    const roomid=context.room;
    const isadmin=context.isadmin;
    const [editorroom,setEditorRoom]=useState(true);
    //const code=context.code;
    //const [runstate,setRunstate]=useState(false);
    
    
    const sendMessage = () => {
        socket.emit("room_message", {roomid,message});
      };
    useEffect(() => {
        socket.on("receive_message", (data) => {
          console.log(data);
          setMessagesReceived(prevMessagesReceived => [...prevMessagesReceived, data]);
          //console.log(messagesReceived);
        });
        socket.on("getaccess",(data)=>{
              setAccessreq(true);
              setAccessender(data.accesssender);
        });
      }, [socket]);

    return(
        <>
        <div className="flex  h-full w-[100%] bg-[#040D12]">
            
            <div className=" relative h-screen w-[70%]  rounded-xl">
           
            <div className="flex  border-gray-700 border-b-2 p-2 justify-between items-center">
            
            {editorroom===true ? <p className="text-lg font-semibold text-[#8576FF]">Collab</p> : <p className="text-lg font-semibold text-[#8576FF]">SelfEditor</p>}
            <div className="flex items-center gap-7 mr-2">
            {isadmin===true && <p className="text-white text-md">Admin</p>}
            {isadmin===false && editorroom===true  && <p className="text-white text-md cursor-pointer hover:bg-[#8576FF] hover:rounded-xl p-1" onClick={()=>{context.getaccess()}}>Access permission</p>}
            {isadmin===false && editorroom===true  && <p className="text-white text-md cursor-pointer hover:bg-[#8576FF] hover:rounded-xl p-1" onClick={()=>{context.leaveacc()}}>Leave Access</p>}
            {editorroom===true ?<p className="text-white text-md cursor-pointer hover:bg-[#8576FF] hover:rounded-xl p-1" onClick={()=>{setEditorRoom(!editorroom)}}>Self Tab</p>
            : <p className="text-white text-md cursor-pointer hover:bg-[#8576FF] hover:rounded-xl p-1" onClick={()=>{setEditorRoom(!editorroom)}}>Collaboration Tab</p>}
            <p className="text-white text-md cursor-pointer hover:bg-[#8576FF] hover:rounded-xl p-1">Terminal</p>
            <img className="h-5 w-5 cursor-pointer" src={play} onClick={context.output} ></img>
            </div>
            </div>
            {accessreq===true && 
            <div className="absolute z-10 top-0 flex justify-center  w-[100%] bg-transparent">
             <div className="bg-white rounded-xl p-4  h-[200px] w-[200px] text-center ">
            <p className="text-gray-800 font-semibold">Request come from</p>
            <p className="text-blue-600 font-semibold">{accessender}</p>
            <p className="text-gray-800 font-semibold">Grant access permission</p>
            <div className="flex justify-center  mt-3 items-center gap-3">
            <button className="bg-[#8576FF] font-semibold" onClick={()=>{setAccessreq(false);context.sendpermission(true,accessender)}}>yes</button>
            <button className="bg-[#8576FF] font-semibold" onClick={()=>{setAccessreq(false);context.sendpermission(false,accessender)}}>No</button>
            </div>
            </div>
            </div>
            } 
            { editorroom === true ? <CodeEditor/> : 
            <SelfEditor />
            }
             
            <div>
            <div className="flex justify-between">
              <p className="text-white text-lg ml-3">output</p>
            </div>
            {/* <div className="overflow-auto scrollbar-thumb scrollbar-thumb-rounded p-4">
                {runstate && <p>{code}</p>}
            </div> */}
           {context.permission && <p className="text-white">true</p>}
            </div>
            
            </div>

            
            <div className="h-screen w-[30%] border-l-2	 border-gray-700 bg-[#040D12] relative shadow-lg rounded-xl ">
                    {chattype===true ?
                    
                    <BardAI />
                    
                    :
                    <>
                    <div className="p-2 bg-[#191825] shadow-xl flex  justify-between items-center rounded-xl rounded-b-none scale-up-hor-right">
                      <p className="text-md text-white ">{roomid}</p>
                      <img className="h-8 w-8 cursor-pointer" onClick={()=>{context.chanechatpage()}} src={geminilogo} />
                    </div>
                
                    <div className="flex flex-col gap-1 h-[85%] overflow-auto scrollbar-thumb scrollbar-thumb-rounded p-4">
                        {messagesReceived.map((element , index) => (
                          <Messagebox messages={element} socketid={socket} key={index} />
                        ))}
                    </div>
                    <div className="flex absolute inset-x-0 bottom-0 gap-3  items-center p-4">
                        <input className="w-[85%] h-10 p-2  rounded-xl bg-[#222831] text-gray-400 "  placeholder="Message..." onChange={(e) => {setMessage(e.target.value);}}/>
                        <img  className=" h-7 w-7 rounded-md cursor-pointer " src={send} onClick={sendMessage}></img>
                    </div>
                    </>
                    }
            </div>
              
        </div>
        <ToastContainer /> 
        </>
    )
}