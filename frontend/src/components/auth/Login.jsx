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
  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/signin', values)
    .then(res => {
      if (res.data.Status === 'Success') {
        navigate('/');
      }else{
        setError(res.data.error)
      }
    })
    .then(err => console.log(err))
  };

  return (
      <div className='main_form'>
        <form onSubmit={handleLogin} className="form mt-4 form__user">
            <h1 className="text-center fs-3">PLease Login</h1>
            { error && (<p className='text-center text-danger'>{error}</p>) }
            <input 
                type="text" 
                name='email'
                onChange={(e) => setValues({...values,email:e.target.value})}
                placeholder="Username" 
                className="form-control" 
            />
            <input 
                type="password" 
                name='password'
                onChange={(e) => setValues({...values,password:e.target.value})} 
                placeholder="Enter Password" 
                className="form-control" 
            />
            <button 
                type="submit"
                className="btn__custom btn__signin"
            >Sign In</button>

            <p className="text-center">OR</p>

            <div>
            <p className="text-center">Forgot Password? <Link to='/signin' className="warning-a">Reset password</Link></p>
            <p className="text-center">Not Yet Registered? <Link to='/signup' className='warning-a'>Sign Up</Link></p>
            </div>
            
        </form>
    </div>
  );
};

export default Login;
