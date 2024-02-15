import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

function Authors() {
  const [authors,setAuthors]=useState([]);
  const [isLoading,setLoading]=useState(false);


  useEffect(()=>{
      const getAuthors=async()=>{
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users`
          );
          setAuthors(response?.data);
          console.log("all authors"+authors);;
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
      getAuthors();
  },[]);

  if(isLoading)
  {
    return <Loader/> 
  }
  return (
    <section className='authors'>
          { authors.length>0?
           <div className="container authors_container">
        {
          authors.map((author)=>{
            return <Link key={author._id} to={`/posts/users/${author._id}`} className='author'>
                   <div className='author_avatar'>
                         <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`} alt={`image of ${author.name}`} />
                   </div>
                   <div className="author_info">
                          <h4>{author.name}</h4>  
                          <p>{author.posts}</p>
                   </div>
                 </Link>
          })
        }
            </div>:
            <h2 className='center'>No data found</h2>
}
    </section>
  )
}

export default Authors