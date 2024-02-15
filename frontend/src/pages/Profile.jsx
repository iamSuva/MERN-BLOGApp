import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import Avatarimg from "../images/avatar.jfif";
import {FaEdit} from "react-icons/fa"
import { FaCheck } from 'react-icons/fa';
import { UserContext } from '../context/userContext';
import axios from 'axios';



function Profile() {
//authorization

const {currentUser}=useContext(UserContext);
const navigate=useNavigate();
const token=currentUser?.token;
//redirect to login if user is not logged in
const [avatar,setAvatar]=useState("");
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [currentPassword,setcurrentPassword]=useState("")
const [newPassword,setNewPassword]=useState("")
const [isAvatarChange,setisAvatarChange]=useState(false);
const [error,setError]=useState("");
useEffect(()=>{
  if(!token)
  {
    navigate("/login");
  }
},[]);
 
useEffect(()=>{
  const getUser=async()=>{
    try {
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,{
        withCredentials:true,headers:{Authorization:`Bearer ${token}`}}  );
       console.log("sd",response.data.avatar);
        const {name,email,avatar}=response.data;
        setAvatar(avatar);
        setName(name);
        setEmail(email);

      
    } catch (err) {
      console.log(err);
    }
    
  }
  getUser();
},[]);

const HandleChangeAvatar=async()=>{
 setisAvatarChange(false);
 try {
  const postData=new FormData();
  postData.set("avatar",avatar);
  const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/users/changeAvatar`,postData,{
    withCredentials:true,headers:{Authorization:`Bearer ${token}`}}  );
    console.log("avar",response.data.avatar);
    setAvatar(response?.data.avatar);
 } catch (error) {
  console.log(error);
 }
}
const updateUserDetails=async(e)=>{
  e.preventDefault();
try {
  const userData=new FormData();
userData.set("name",name);
userData.set("email",email);
userData.set("currentPassword",currentPassword);
userData.set("newPassword",newPassword);
const response=await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/editUser`,userData,{
  withCredentials:true,headers:{Authorization:`Bearer ${token}`}}  );
  if(response.status==200)
  {
    return navigate("/logout");
  }

} catch (err) {
  setError(err.response.data.message)
}
}
  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          MyPosts
        </Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
            <form action=""className='avatar_form'>
              <input
               type='file'accept='png,jpg,jpeg' 
              name="avatar" id="avatar"
              onChange={e=>setAvatar(e.target.files[0])}
               />
              <label htmlFor='avatar' onClick={()=>setisAvatarChange(true)}>
                <FaEdit/>
              </label>
            </form>
           { isAvatarChange && <button className='profile_avatar_btn' onClick={HandleChangeAvatar}>
              <FaCheck/>
            </button>}
          </div>
            {/* update form */}
          <h1>{currentUser.name}</h1>
            <form action=""
            className='form profile_form' onSubmit={updateUserDetails}>
              {error && <p className='form_error_message'>{error}</p>}
            
              <input type="text" placeholder='Full Name' value={name} onChange={e=>setName(e.target.value)} />
              <input type="email" placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
              <input type="password" placeholder='Password' value={currentPassword} onChange={e=>setcurrentPassword(e.target.value)} />
              <input type="password" placeholder='New Password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
               
            <button type="submit" className='btn primary'>Update</button>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Profile;