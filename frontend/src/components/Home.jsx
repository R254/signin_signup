import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('')


  const handleLogout = () => {
    
  }
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081/')
    .then(res => {
      if (res.data.Status === 'Success') {
        setAuth(true);
        setName(res.data.name)
      }else{
        setAuth(false);
        setMessage(res.data.error)
      }
    })
    .then(err => console.log(err))
  }, [])
  
  return (
    <div className="container mt-4">
      {
        auth 
        ? 
        <div>
          <h3>Welcome back, {name}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>Welcome to our site</h3>
          <p>Login or register to proceed</p>
          <Link to="/signin" className="btn btn-success me-3">Login</Link>
          <Link to="/signup" className="btn btn-success">Register</Link>
        </div>
      }
    </div>
  )
}

export default Home