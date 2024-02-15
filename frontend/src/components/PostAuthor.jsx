import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import avatar from "../images/avatar.jfif";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"
import axios from 'axios';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);



function PostAuthor({creatorId,createdAt}) {
 
  const [creator,setCreator]=useState({});
  useEffect(()=>{
    const getAuthor=async()=>{
      try {
        const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${creatorId}`);
       console.log(response.data);
        setCreator(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAuthor();
  },[]);
  
  //console.log("author name is "+author.name);
  return (
    <Link to={`/posts/users/${creator._id}` } className='post_author'>
          <div className="post_author_avatar">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${creator?.avatar}`} alt="" />
          </div>
          <div className="post_author_details">
            <h5>BY:{creator.name}</h5>
            <small><ReactTimeAgo date={new Date(createdAt)} locale='en-IN'/></small>
          </div>
    </Link>
  )
}

export default PostAuthor;