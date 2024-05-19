import React from "react";
import geminilogo from "../assets/gemini.png";

export default function AIchatbox(props){
    //console.log(props.message)
    // const data=props.message;
    // props.message.map((str,idx)=>{
    //      console.log("")
    //      console.log(str);
    // })
    return(
        <>
            <div className="bg-[#31363F] rounded-xl p-2 max-w-[100%] shadow-2xl">
            
                {props.message.map((str,idx)=>(
                    
                    <React.Fragment key={idx}>
                    {idx === 0 ? (
                        <div className="flex gap-3 items-center">
                        <img className="h-7 w-7 cursor-pointer" src={geminilogo} alt="Gemini Logo" />
                        <p className="text-[#8576FF] text-sm font-semibold">{str}</p>
                        </div>
                    ) : (
                        <p className="text-white text-sm" key={idx}>{str}</p>
                    )}
                    </React.Fragment>
                ))}
                {/* <p className="text-white font-semibold text-lg">{props.messages.socketId}</p> */}
            </div>
        
        </>
    )
}
