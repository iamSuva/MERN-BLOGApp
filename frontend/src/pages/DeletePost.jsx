import React, { useContext, useEffect,useState } from 'react'
import { Link, useNavigate,useLocation, useParams} from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';
function DeletePost({postId}) {
  const [isLoading,setLoading]=useState(false);
  const {currentUser}=useContext(UserContext);
  const navigate=useNavigate();
  const location=useLocation();
  const token=currentUser?.token;
  //redirect to login if user is not logged in
  useEffect(()=>{
    if(!token)
    {
      navigate("/login");
    }
  },[]);

const HandleDeletePost=async()=>{
  setLoading(true);
  try {
     const response=await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`,{withCredentials:true,
  headers:{Authorization:`Bearer ${token}`}})
  if(response.status==200)
  {
    if(location.pathname==`/myposts/${currentUser.id}`)
    {
      navigate(0);
    }else{
      navigate("/");
    }
  }
  } catch (error) {
    console.log("could not delete")
  }
  setLoading(false);
}
  if(isLoading)
  {
    return <Loader/>
  }
  return (
   <Link className='btn sm danger' onClick={HandleDeletePost}>Delete</Link>
  ) 
}

export default DeletePost