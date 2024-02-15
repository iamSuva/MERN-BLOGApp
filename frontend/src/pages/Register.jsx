import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from "axios";
function Register() {
 const [userData,setUserData]=useState({
  name:"",
  email:"",
  password:""
 })
 const [error,setError]=useState("");
 const navigate=useNavigate();

  const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState,[e.target.name]:e.target.value};
    })
  }
  const handleRegister=async(e)=>{
    e.preventDefault();
    setError("");
    try {
       const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`,userData);
       const newUser=await response.data;
       console.log(newUser);
       if(!newUser)
       {
        setError("could not register.Please try agian");

       }
       navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  return (
    <section className="register">
      <div className="container">
        <h2>Sign up</h2>
        <form onSubmit={handleRegister}
        className='form register_form'>
       {error && <p className='form_error_message'>{error}</p>}
         <input type="text" placeholder='Full Name' name="name" value={userData.name} onChange={changeInputHandler} autoFocus/>
         <input type="text" placeholder='Enter Email' name="email" value={userData.email} onChange={changeInputHandler} autoFocus/>
         <input type="password" placeholder='Enter password' name="password" value={userData.password} onChange={changeInputHandler} autoFocus/>
        <button type='submit' className='btn primary'>Register</button>
        </form>
        <small>Already have an Account ? 
          <Link to="/login">Login</Link>
        </small>
      </div>
       
    </section>
  )
}

export default Register;