import React, { useState, useContext, useEffect } from "react";

import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
function CategoryPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {category}=useParams();
  console.log(category);
  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`
        );
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchedPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="category_posts">
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

export default CategoryPost;
