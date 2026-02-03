// import React, { useState } from "react";
// import axios from "axios";

// export default function Register() {
//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/api/auth/register", user);
//       alert(res.data);
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="py-4">
//         <h1>Registration Page</h1>
//         <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="name"
//                 placeholder="Enter your name"
//                 onChange={handleChange}
//                 required
//               />

//               <label className="form-label">Username</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 placeholder="Enter your username"
//                 onChange={handleChange}
//                 required
//               />

//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 placeholder="Enter your email"
//                 onChange={handleChange}
//                 required
//               />

//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 placeholder="Enter your password"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <button type="submit" className="btn btn-primary">
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
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
      const res = await axios.post("http://localhost:8080/api/auth/register", user);
      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: res.data,
        confirmButtonColor: "#0d6efd"
      });
      setUser({ name: "", username: "", email: "", password: "" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: "Please try again or check your details.",
        confirmButtonColor: "#dc3545"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-5 border rounded p-4 shadow bg-white">
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your full name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Choose a username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={user.email}
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
                className="form-control"
                name="password"
                placeholder="Create a password"
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

          {/* Submit Button */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center mt-3 text-muted">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}