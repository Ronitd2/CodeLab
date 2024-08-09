import React from "react"
import { useState } from "react";
export default function Userlist()
{

 const [play,setPlay]=useState(false);
return(    
    <div>

        <button  onClick={()=>{setPlay(!play)}} className="text-white text-md cursor-pointer hover:bg-[#8576FF] hover:rounded-xl p-1">
            All Users 
        </button>

        {play===true && 

        <div className="z-50 absolute w-24 h-24 bg-slate-700 text-white font-semibold">
            <p>User 1</p>
            <p>User 2</p>
            <p>User 3</p>
            <p>User 4</p>
        </div>

        }

    </div>
)
}