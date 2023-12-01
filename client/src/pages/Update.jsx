import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Update = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
      });
      const [err, setError] = useState(null);
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("/auth/register", inputs);
          alert("User Profile Updated Succesfully");
          navigate("/login");
        } catch (err){
          setError(err.response.data);
        }
      };

  return (
    <div className="auth">
      <h1>Update Profile</h1>
      <form>
        <input
          required
          type="text"
          placeholder="New Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="New Email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="New Password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Update</button>
        {err && <p>{err}</p>}
        {/* <span>
          Your information has been updated.<Link to="/login">Login</Link>
        </span> */}
      </form>
    </div>
  )
}

export default Update