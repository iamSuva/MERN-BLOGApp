import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <ul className="footer_categories">
        <li>
          <Link to="/posts/categories/Education">Education</Link>
        </li>
        <li>
          <Link to="/posts/categories/Politics">Programming</Link>
        </li>
        <li>
          <Link to="/posts/categories/Sports">Sports</Link>
        </li>
        <li>
          <Link to="/posts/categories/Weather">Weather</Link>
        </li>
        <li>
          <Link to="/posts/categories/Entertainment">Entertainment</Link>
        </li>
        <li>
          <Link to="/posts/categories/Travel">Travel</Link>
        </li>
        <li>
          <Link to="/posts/categories/News">News</Link>
        </li>
      </ul>
      <div className="footer_copyright">
             <small>
                All Rights reserved &copy; Copyright,Suvadip
             </small>
      </div>
    </footer>
  );
}

export default Footer;
