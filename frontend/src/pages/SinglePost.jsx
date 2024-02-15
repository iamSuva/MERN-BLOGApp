import React,{useEffect,useContext,useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom';
// import kolkata from "../images/kolkata.jpg";
import { UserContext } from '../context/userContext';
import DeletePost from './DeletePost';
import Loader from '../components/Loader';
import axios from 'axios';



function SinglePost() {
   const {id}=useParams();
   console.log("single post id "+id);

   const [post,setPost]=useState(null);

   const [error,setError]=useState(null);
   const [isLoading,setLoading]=useState(false);

   const {currentUser}=useContext(UserContext);
    useEffect(()=>{
       const getPost=async()=>{
         setLoading(true);
         try {
            const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
            console.log("single post ",response.data);
            setPost(response.data);
           
         } catch (error) {
            setError(error.response.data.message);
         }
         setLoading(false);
      }
      getPost();
    },[])  ;
   
   console.log("post ",post);
   if(isLoading)
     {
      return <Loader/>
     }

  return (
     <section className='post-detail'>
      {error && <p className='error'>{error}</p>}
    {post &&  <div className="container post_detail_container">
           <div className="post_detail_header">
            <PostAuthor creatorId={post.creator} createdAt={post.createdAt}/>
          {currentUser?.id==post.creator  &&
           <div className="post_detail_btn">
               <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">Edit</Link>
               <DeletePost postId={id}/>
           
            </div>}
           </div>
           <h1>{post.title}</h1>
           <div className="post_detail_thumbnail">
               <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
           </div>
           <p dangerouslySetInnerHTML={{__html:post.description}}></p>
      </div>}
     </section>
  )
}

export default SinglePost