import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/signup', values)
    .then(res => {
      if (res.data.Status === 'Success') {
        navigate('/signin');
      }else{
        alert("Error")
      }
    })
    .then(err => console.log(err))
  };

  return (
      <div className='main_form'>
        <form onSubmit={handleSubmit} className="form mt-4 form__user">
            <h1 className="text-center fs-3">PLease Sign Up</h1>
            { error && (<p className='text-center text-danger'>{error}</p>) }
            <input 
                type="text" 
                name='firstName'
                onChange={(e) => setValues({...values, firstName:e.target.value})}
                placeholder="First Name" 
                className="form-control" 
            />
            <input 
                type="text" 
                name='lastName'
                onChange={(e) => setValues({...values, lastName:e.target.value})}
                placeholder="Last Name" 
                className="form-control" 
            />
            <input 
                type="email" 
                name='email'
                onChange={(e) => setValues({...values, email:e.target.value})}
                placeholder="Enter Email" 
                className="form-control" 
            />
            <input 
                type="password"
                name='password'
                onChange={(e) => setValues({...values, password:e.target.value})} 
                placeholder="Enter Password" 
                className="form-control" 
            />
            <div className="text-danger error-txt"></div>
            <button 
                type="submit"
                className="btn__custom btn__signin"
            >
              Sign Up
            </button>

            <p className="text-center">OR</p>

            <div>
            <p className="text-center">Already Registered? <Link to="/signin" className="warning-a">Sign In</Link></p>
            </div>
            
        </form>
    </div>
  );
};

export default Login;
