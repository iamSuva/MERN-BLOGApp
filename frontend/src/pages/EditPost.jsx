import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../context/userContext';
import ReactQuill from "react-quill";
import { useNavigate, useParams } from 'react-router-dom';

import "react-quill/dist/quill.snow.css";
import axios from 'axios';



function EditPost() {
 //autherization
const {id}=useParams();
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

 //end of authorization
const [error,setError]=useState("");

  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("uncategorized");
  const [description,setDescription]=useState("");
  const [thumbnail,setThumbnail]=useState("")
const post_categories=["agriculture","business","education","entertainment","art","weather","sport","investment",'uncategorized'];
const modules={
  toolbar:[
    [{'header':[1,2,3,4,5,false]}],
    ['bold',"italic",'underline',"strike","blockquote"],
    [{'list':'ordered'},{'list':'bullete'},{'indent':'-1'},{'indent':'+1'}],
    ['link','image'],
    ['clean']
  ]
}
const formats=[
  'header',"bold","italic","underline","strike","blockquote",
  "list","bullet","indent","link","image"
]

useEffect(()=>{
  const getPost=async()=>{
    try {
      const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }
  getPost();
},[]);

const HandleEdit=async(event)=>{
  event.preventDefault();

const postData=new FormData();
 postData.set("title",title);
 postData.set("category",category);
 postData.set("description",description);
 postData.set("thumbnail",thumbnail);

try {
  const response=await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,postData,{
    withCredentials:true,headers:{Authorization:`Bearer ${token}`}}  );
    if(response.status==200)
    {
      return navigate("/");
    }

} catch (err) {
  setError(err.response.data.message);
}
}

  return (
    <section className="create_post">
      <div className="container create_post_container">
         <h2>Edit Post</h2>
         {error && <p className="form_error_message">
            {error}
          </p>}
          <form  onSubmit={HandleEdit}className="form create_post_form">
             <input type="text" 
             placeholder="title"
              value={title}
              onChange={e=>setTitle(e.target.value)} 
              />
              <select name="category" value={category} onChange={e=>setCategory(e.target.value)}>
                  {
                    post_categories.map((cat)=>{
                      return <option key={cat}>{cat}</option>
                    })
                  }
              </select>
              <ReactQuill className='quill_editor'
              value={description} modules={modules} formats={formats} onChange={setDescription}/>
                  <input type="file" onChange={e=>setThumbnail(e.target.files[0])} accept="png,jpg,jpeg" />
                  <button type="submit" className="btn primary">update</button>
          </form>
      </div>

    </section>
  )
}

export default EditPost