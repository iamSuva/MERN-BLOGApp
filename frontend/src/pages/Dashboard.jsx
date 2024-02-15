import React, { useState ,useEffect,useContext} from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader';
import axios from 'axios';
import DeletePost from './DeletePost';
function Dashboard() {
  const {id}=useParams();
  const [posts,setPosts]=useState([]);
  const [isLoading,setLoading]=useState(false);
  const {currentUser}=useContext(UserContext);
  const navigate=useNavigate();
  const token=currentUser?.token;
  //redirect to login if user is not logged in
  useEffect(()=>{
    if(!token)
    {
      navigate("/login");
    }
  },[]);
  

  useEffect(()=>{
   const fetchedPosts=async()=>{
    setLoading(true);
    try {
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,
      {withCredentials:true,headers:{Authorization:`Bearer ${token}`}});
      if(response.status==200)
      {
        setPosts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
   }
   fetchedPosts();
  },[]);
  if(isLoading)
  {
    return <Loader/>
  }
  
  
  
  
  
  return (
    <section className='dashboard'>
     {
           posts.length>0 ?
           <div className="container dashboard_container">
            {
              posts.map(post=>{
                return <article key={post._id} className='dashboard_post'>
                  <div className="dashboard_post_info">

                        <div className='dashboard_post_thumbnail'>
                          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt=""/>
                        </div>
                        <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard_post_actions">
                    <Link to={`/posts/${post._id}`} className="btn sm">view</Link>
                    <Link to={`/posts/${post._id}/edit`} className="btn sm primary">Edit</Link>
                     <DeletePost postId={post._id}/>
                  </div>
                </article>
              })
            }
           </div>:
           <h2 className='center'>You Have No Posts</h2>
     }
    </section>
  )
}

export default Dashboard