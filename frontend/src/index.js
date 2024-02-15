import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
import App from './App';
import Register from './pages/Register';
import Logout from "./pages/Logout";
import Profile from './pages/Profile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import CategoryPost from './pages/CategoryPost';
import Dashboard from './pages/Dashboard';
import AuthorPosts from './pages/AuthorPosts';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import UserProvider from './context/userContext';
const router=createBrowserRouter([
  {
    path:"/",
    element:<UserProvider>
      <App/>
      </UserProvider>,
    errorElement:<ErrorPage/>,
    children:[
      {index:true,element:<Home/>},
      {path:"posts/:id",element:<SinglePost/>},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"logout",element:<Logout/>},
      {path:"profile/:id",element:<Profile/>},
      {path:"authors",element:<Authors/>},
      {path:"create",element:<CreatePost/>},
      {path:"posts/categories/:category",element:<CategoryPost/>},
      {path:"myposts/:id",element:<Dashboard/>},
      {path:"posts/users/:id",element:<AuthorPosts/>},
      {path:"posts/:id/edit",element:<EditPost/>},
      {path:"posts/:id/delete",element:<DeletePost/>},
      



    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


