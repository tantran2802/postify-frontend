import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // You can create a CSS file for styling
export default function Signup(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const navigateTo = useNavigate();
      const handleChange = (e) => {
        const { name, value } = e.target;
        const updateData = {...formData, [name]: value}
        setFormData(updateData);
      }
      function handleSubmit(e) {
        e.preventDefault();
            fetch('http://localhost:3001/users',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(formData)
            }).then(async (data) => {
                const tokenObtained = await data.json();
                console.log(tokenObtained);
                navigateTo('/posts')
            }).catch(e => console.log(e))
            }
    
    
      return (
        <div className="login-container">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group text-danger">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      );

}