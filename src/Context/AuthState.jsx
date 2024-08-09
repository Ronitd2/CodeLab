import React from 'react'
import AuthContext from './AuthContext';
import { useState ,useContext} from 'react';
import { toast } from 'react-toastify';
import Firebaseapp from "../Utils/AuthUtils/Firebase";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,signOut ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SocketContext from "./SocketContext";

const AuthState=(props)=>{
    const navigate = useNavigate();
    const auth = getAuth(Firebaseapp);
    const provider = new GoogleAuthProvider();
    const [userdetails,setUserdetails]=useState("");
    const [name,setName]=useState("");
    const [authloader,setAuthLoader]=useState(false);
    const context=useContext(SocketContext);

    const setloggeduser=(data)=>{
        setUserdetails(data);
    }
    // const extractname=(namevalue)=>{
    //     let ind=0
    //     for(let i=0;i<namevalue.length;i++)
    //         {
    //             if(namevalue[i]==='@')
    //                 {
    //                     ind=i;
    //                     break;
    //                 }
    //         }
    //     const value=namevalue.substring(0,ind);
    //     return value;
    // }
    const logout=async()=>{
        try{
            const res=await signOut(auth);
            setUserdetails("");
            localStorage.removeItem('token');
            localStorage.removeItem('collabcode');
            localStorage.removeItem('selfcode');
            localStorage.removeItem('room');
            
            
            
            navigate('/login');
        }
        catch(err){
            console.log("Cannot be logged out");
            console.log(err);
        }
    }
    const loginfunc=async(email,password)=>{
        try{
        setAuthLoader(true);
        const response=await signInWithEmailAndPassword(auth, email, password);
        console.log(response.user);
        //const str=extractname(response.user.email);
        setUserdetails(response.user);
        const response2 = await fetch("https://codelabserver.onrender.com/login/",{
            method:'POST',
            body:JSON.stringify({uid:response.user.uid}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data=await response2.json();
        setAuthLoader(false);
        toast.success("Login Successful");
        console.log(data);
        localStorage.setItem('token',data.tokenname);
        localStorage.setItem('email',response.user.email);
        console.log("Login Successfull");
        navigate('/');
        }
        catch(err)
        {
            setAuthLoader(false);
            alert("invalid credentials");
        }
    }
    const loginwithgoogle=async()=>{
        try{
            const response=await signInWithPopup(auth, provider);
            console.log(response);
            setUserdetails(response.user);
            const response2 = await fetch("https://codelabserver.onrender.com/signup/",{
            method:'POST',
            body:JSON.stringify({uid:response.user.uid,
                name:response.user.displayName,
                email:response.user.email,
                pic:response.user.photoURL}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        // const data=await response2.json();
        // console.log(data);
        localStorage.setItem('token',response.user.displayName);
        localStorage.setItem('email',response.user.email);
            console.log("Login Successfull");
            navigate('/');
        }
        catch(err){
            console.log(err);
            console.log("Invalid Credential");
        }
    }
    const signupfunc=async (email,password,namedata)=>{
        try
        {
        setAuthLoader(true);
        const response= await createUserWithEmailAndPassword(auth,email,password);
        console.log(response.user.uid);
        console.log(namedata);
        console.log(response.user.email);
        console.log(response.user.photoURL);
        setUserdetails(response.user);
        
        
        const response2 = await fetch("https://codelabserver.onrender.com/signup/",{
            method:'POST',
            body:JSON.stringify({uid:response.user.uid,
                name:namedata,
                email:response.user.email,
                pic:response.user.photoURL}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data=await response2.json();
        setAuthLoader(false);
        console.log(data);
        localStorage.setItem('token',data.tokenname);
        localStorage.setItem('email',response.user.email);
        console.log("Sign up Successfull");
        navigate('/');
        }catch(err)
        {
            console.log(err);
            console.log("Email has already exist");
        }
    }

    const googleSignUp=async()=>{
        try{
            const response=await signInWithPopup(auth, provider);
            console.log(response);
            setUserdetails(response.user);
            const response2 = await fetch("https://codelabserver.onrender.com/signup/",{
                method:'POST',
                body:JSON.stringify({uid:response.user.uid,
                    name:response.user.displayName,
                    email:response.user.email,
                    pic:response.user.photoURL}),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            localStorage.setItem('token',response.user.displayName);
            localStorage.setItem('email',response.user.email);
            console.log("Sign up Successfull");
            navigate('/');
        }
        catch(err){
            console.log(err);
            console.log("Invalid Credential");
        }
    }
return(
    <>
        <AuthContext.Provider value={{userdetails,name,authloader,loginfunc,signupfunc,googleSignUp,loginwithgoogle,setloggeduser,logout}}>
        {props.children}
        </AuthContext.Provider>
    </>
)
}
export default AuthState;