import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
          {isLoggedIn && (
        <Link className="navbar-brand" to="/">FullStack Application</Link>
          )}

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
              {!isLoggedIn && (
              <>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
               </>
            )}
          </ul>

          {isLoggedIn && (
            <>
              <Link className="btn btn-outline-light me-2" to="/adduser">
                Add User
              </Link>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}