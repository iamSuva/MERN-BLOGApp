import React from 'react'
import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
   <section className='error_page'>
        <div className="center">
              <Link to="/" className="btn primary">
              Go back Home
              </Link>
              <h2>404! Page not found</h2>
        </div>
   </section>
  )
}

export default ErrorPage