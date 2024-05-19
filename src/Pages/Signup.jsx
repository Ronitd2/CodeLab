import React, { useState ,useEffect,useContext} from "react";
import {TailSpin} from 'react-loader-spinner';
import googlelogo from "../assets/google.png";
import { Link} from "react-router-dom";

// import { getDatabase } from "firebase/database";
import AuthContext from "../Context/AuthContext";
export default function Signup()
{
    let context = useContext(AuthContext);
    const load=context.authloader;
    //const database=getDatabase(Firebaseapp);
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[name,setName]=useState("");
    

    
    return(
        <>
            <div className="flex items-center justify-center h-screen w-screen ">
                <div className=" bg-[#040D12] shadow-xl  shadow-gray-900 rounded-3xl p-10 w-[30%]">
                <h1 className="text-2xl text-center font-semibold">Sign Up</h1>
                <div className="mt-7">
                <input onChange={(e)=>{setName(e.target.value)}} type="text" id="input-group-1" className="bg-transparent mt-7 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[85%] mx-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"/>
                <input  onChange={(e)=>{setEmail(e.target.value)}} type="text" id="input-group-1" className="bg-transparent mt-7 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[85%] mx-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"/>
                <input  onChange={(e)=>{setPassword(e.target.value)}} type="text" id="input-group-1" className="bg-transparent mt-7 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[85%] mx-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"/>

                </div>
                <div className="flex items-center justify-center mt-7">
                {load ? <TailSpin
                        visible={true}
                        height="40"
                        width="40"
                        color="#8576FF"
                        ariaLabel="tail-spin-loading"
                        radius="0.6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                 : <button  onClick={()=>{context.signupfunc(email,password,name)}} className="bg-[#5755FE] w-32 h-12 rounded-md  p-2 text-white text-md  ">sign up</button>
                }
                </div>

                <div className="flex items-center justify-center mt-7">
                <button onClick={()=>{context.googleSignUp()}} className="max-w-70 border-2 border-gray-950 rounded-md p-3">Sign up with google <img className="w-8 h-6  inline-block pl-2" src={googlelogo}></img></button>
                </div>
                <p className=" text-center text-md font-semibold mt-7">already have an account ?<Link to="/login"><span className="text-[#5755FE] text-md font-semibold ml-2">login</span></Link></p>

                </div>
            </div>
        </>
    )
}