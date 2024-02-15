import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {UserContext}from '../context/userContext';
import axios from "axios";

function Login() {
 const [userData,setUserData]=useState({
  email:"",
  password:""
 });
 const [error,setError]=useState("");
 const navigate=useNavigate();
 const {setCurrentUser}=useContext(UserContext);//accessing contetx data
  
 const HandleLogin=async(e)=>{
       e.preventDefault();
       setError("");
       try {
         const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,userData);
         const user=await response.data;
         setCurrentUser(user);
         navigate("/");
       } catch (error) {
        setError(error.response.data.message);
       }
 }
 
 
 const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState,[e.target.name]:e.target.value};
    })
  }



  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={HandleLogin}
        className='form login_form'>
       {error && <p className='form_error_message'>{error}</p>}
        
         <input type="text" placeholder='Enter Email' name="email" value={userData.email} onChange={changeInputHandler} autoFocus/>
         <input type="password" placeholder='Enter password' name="password" value={userData.password} onChange={changeInputHandler} autoFocus/>
        <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Already have  not an Account ? 
          <Link to="/register">Register</Link>
        </small>
      </div>
       
    </section>
  )
}

export default Login