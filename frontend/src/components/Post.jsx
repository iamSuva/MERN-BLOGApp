import React, { useEffect, useState } from "react";

import PostItem from "./PostItem";
import Loader from "./Loader";
import axios from "axios";
// import { dummy_posts } from '../data';
function Post() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchedPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container post_container">
          {posts.map((post) => {
            return <PostItem post={post} key={post._id} />;
          })}
        </div>
      ) : (
        <h2 className="center">No post found</h2>
      )}
    </section>
  );
}

export default Post;
