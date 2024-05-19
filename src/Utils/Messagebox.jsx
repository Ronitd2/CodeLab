import React from "react";
export default function Messagebox(props){
    //console.log(props.socketid.id)
    return(
        <>
        <div className={props.messages.socketId===props.socketid.id ?"flex justify-end  ":"flex justify-start  gap-2"}>
            {/* {props.messages.socketId!==props.socketid.id && <p className="bg-[#8576FF] p-2 rounded-full text-white h-10  font-bold">{props.messages.sender[0]}</p>} */}
            <div className={props.messages.socketId===props.socketid.id ?"bg-[#8576FF] rounded-xl rounded-tr-none p-2 max-w-[75%] shadow-2xl":"bg-[#31363F] rounded-xl rounded-tl-none p-2 max-w-[75%] shadow-2xl"}>
                {props.messages.socketId!==props.socketid.id && <p className=" text-sm text-blue-600 font-semibold ">{props.messages.sender}</p>}
                <p className="text-white  text-md">{props.messages.message}</p>
                {/* <p className="text-white font-semibold text-lg">{props.messages.socketId}</p> */}
            </div>
        </div> 

        </>
    )
}