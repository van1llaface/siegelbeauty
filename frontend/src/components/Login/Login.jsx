import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { useContext } from 'react';
import LoginStyles from './Login.module.css'

function Login() {
  const loginURL = 'http://localhost:3000/users/login';
  const [error, setError] = useState('');

  const { getLoggedIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await axios.post(loginURL, values);
        getLoggedIn();
      } catch {
        (error) => setError(error.response.data.error);
      }
    },
  });

  return (
    <div className={LoginStyles.container}>
      <h3 className={LoginStyles.title}>Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button type='submit'>
          Login
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to='/signup'>
          Register
        </Link>
      </p>
      <div>{error}</div>
    </div>
  );
}

export default Login;
