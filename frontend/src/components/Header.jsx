import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from '../context/userContext';


function Header() {
  const { currentUser } = useContext(UserContext);
  const [Navshow, setNavShow] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setNavShow(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNav = () => {
    setNavShow(!Navshow);
  }

  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className='nav_logo'>
          <img src={logo} alt="nav_logo" />
        </Link>
        <button className="nav_toggle_btn" onClick={toggleNav}>
          {Navshow ? <AiOutlineClose /> : <FaBars />}
        </button>
        <ul className={`nav_menu ${Navshow ? 'show' : ''}`}>
          {currentUser?.id &&
            <>
              <li><Link to={`profile/${currentUser.id}`}>{currentUser.name}</Link></li>
              <li><Link to="/create">Add Post</Link></li>
              <li><Link to="/authors">Authors</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          }
          {!currentUser?.id &&
            <>
              <li><Link to="/authors">Author</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign up</Link></li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Header;
