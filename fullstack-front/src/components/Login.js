

// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {

//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     username: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/api/auth/login", user);
//       alert(res.data);
//       localStorage.setItem("isLoggedIn", "true");
//       navigate("/");
//     } catch (err) {
//       alert("Login failed: Invalid username or password");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="py-4">
//         <h1>Login Page</h1>
//       </div>

//       <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//         <form onSubmit={handleSubmit}>
          
//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input
//               type="text"
//               name="username"
//               className="form-control"
//               placeholder="Enter your username"
//               value={user.username}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={user.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>

//           <Link className="btn btn-outline-secondary ms-2" to="/register">
//             Register
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", user);
      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: res.data,
        confirmButtonColor: "#0d6efd"
      });
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: "Invalid username or password",
        confirmButtonColor: "#dc3545"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-5 border rounded p-4 shadow bg-white">
        <h2 className="text-center mb-4">Welcome Back !!🥳</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <Link className="btn btn-outline-secondary" to="/register">
              Create New Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}