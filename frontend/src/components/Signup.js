import react,{useState,useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
import { Button } from 'react-bootstrap';

import {useNavigate} from 'react-router-dom'
const Signup=()=>{
const [name,setName]=useState("");
const [password,setPassword]=useState("");
const [email,setEmail]=useState("");
const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
const collectData=async()=>{
    console.warn(name,email,password);
    let result=await fetch('http://localhost:3476/register',{
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        },
    });
    result=await result.json();
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if(result){
navigate('/');
    }
}

    return(
        <div className="register">
            <div>
            <h1>
                Register

            </h1>
            </div>
            <input className="inputBox" type="text"
           value ={name}onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="inputBox" type="password"
            value ={password}onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password"/>
            <input className="inputBox" type="password "
            value ={email}onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
            <Button variant="warning" onClick={collectData} type="button">SignUp</Button>
            
        </div>
    )
}
export default Signup;