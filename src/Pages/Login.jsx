import React, { useEffect ,useState,useContext} from "react";
import { Link} from "react-router-dom";
import {TailSpin} from 'react-loader-spinner';
import googlelogo from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
export default function Login()
{
    let context = useContext(AuthContext);
    // const navigate = useNavigate();
    const load=context.authloader;
    const username=context.userdetails.email;
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    
    return(
        <>
        {/* <div className="flex-col items-center h-screen w-screen justify-center"> */}
        
            <div className="flex items-center justify-center h-screen w-screen ">
                <div className="  bg-[#040D12] rounded-3xl p-10 w-[25%] shadow-xl  shadow-gray-900">
                <h1 className="text-2xl text-center font-semibold">Log In</h1>
                <div className="mt-7">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}}  className="bg-transparent  border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[100%] mx-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}  className="bg-transparent mt-5 border-gray-400 text-gray-500 text-sm  border  border-b-1 border-t-0 border-l-0 border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-[100%] mx-auto  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"/>

                </div>
                <div className="flex items-center justify-center mt-7">
                { load ?<TailSpin
                        visible={true}
                        height="40"
                        width="40"
                        color="#8576FF"
                        ariaLabel="tail-spin-loading"
                        radius="0.6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                : <button onClick={()=>{context.loginfunc(email,password)}} className="bg-[#5755FE] w-32 h-12 rounded-md  p-2 text-white text-md  ">log in</button>}
                </div>
                <div className="flex items-center justify-center mt-7">
                <button onClick={()=>{context.loginwithgoogle()}} className="max-w-70 border-2 border-gray-950 rounded-md p-3">Sign up with google <img className="w-8 h-6  inline-block pl-2" src={googlelogo}></img></button>
                </div>
                <p className=" text-center text-md font-semibold mt-7">don't have an account ?<Link to="/signup"><span className="text-[#5755FE] text-md font-semibold ml-2">sign up</span></Link></p>
                </div>

                 
               
            </div>
            
        </>
    )
}