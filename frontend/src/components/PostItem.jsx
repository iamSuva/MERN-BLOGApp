import React from 'react'
import {Link}from "react-router-dom";
import PostAuthor from './PostAuthor';
function PostItem({post}) {
   console.log("inside postitem ",post);
    const shortDesc=post.description.length>120 ?post.description.substr(0,120)+" ....":post.desc;
    const shortTitle=post.title.length>30 ?post.title.substr(0,30)+" ....":post.title;
  return (
   <article className='post'>
         <div className="post_thumbnail">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt={post.title}/>
         </div>
         <div className="post_content">
            <Link to={`/posts/${post._id}`}>
            <h3>{shortTitle}  </h3>
         </Link>
         <p dangerouslySetInnerHTML={{__html:shortDesc}}></p>
         </div>
         <div className="post_footer">
            <PostAuthor creatorId={post.creator} createdAt={post.createdAt}/>
            <Link to={`/posts/categories/${post.category}`} className='btn category'>
            {post.category}
            </Link>
         </div>
   </article>
  )
}

export default PostItem;