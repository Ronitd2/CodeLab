import React, { useState } from "react";
import messagebox from "../assets/messagebox.png";
import send from "../assets/send-message.png";
import geminilogo from "../assets/gemini.png";
import { useContext } from "react";
import SocketContext from '../Context/SocketContext';
import AIchatbox from "../Utils/AIchatbox";
import loadercomp from "../Utils/Loadercomp";
import {TailSpin} from 'react-loader-spinner';

export default function BardAI()
{
    const context=useContext(SocketContext);
    const airecord=context.aioutput;
    const [promptquary,setPromptQuary]=useState("");
    const load=context.loader;
    return(
        <>
                    <div className="p-2 bg-[#191825]  flex  justify-between items-center shadow-xl rounded-xl rounded-b-none ">
                      <div className="flex gap-3">
                      <img className="h-7 w-7 cursor-pointer" src={geminilogo} alt="Gemini Logo" />
                      <p className="text-md text-white ">Gemini AI</p>
                      </div>
                      
                      <img className="h-7 w-7 cursor-pointer" onClick={()=>{context.chanechatpage()}} src={messagebox} />
                    </div>
                    {/* <loadercomp /> */}
                    
                    <div className="flex flex-col gap-1 h-[85%] overflow-auto scrollbar-thumb scrollbar-thumb-rounded p-4"> 
                    { airecord.map((element , index) => (
                          <AIchatbox message={element} key={index} />
                        ))}
                        {load &&
                    <div className="flex justify-center">
                        <TailSpin
                        visible={true}
                        height="40"
                        width="40"
                        color="#8576FF"
                        ariaLabel="tail-spin-loading"
                        radius="0.6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                    </div>
                    }
                    </div>
                    <div className="flex absolute inset-x-0 bottom-0 gap-3 items-center p-4">
                        <input className="w-[85%] h-10 p-2  rounded-xl bg-[#222831] text-gray-400 "  placeholder="Enter the prompt..." onChange={(e) => {setPromptQuary(e.target.value);}}/>
                        <img  className=" h-7 w-7 rounded-md " src={send} onClick={()=>{context.getairesponse(promptquary)}} ></img>
                    </div>

        </>
    )
}