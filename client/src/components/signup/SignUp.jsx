/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../firebase';

function SignUp() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const sendUserDataToServer = (user) => {
    const userData = {
      username,
      uid: user.uid,
      email: user.email,
    };
    axios
      .post('http://13.57.207.155:8080/api/users', userData)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => console.log('Err in sendUserDataToServer: ', err));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('* Passwords do not match');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          console.log('user', user);
          sendUserDataToServer(user);
        })
        .catch((err) => {
          if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
            setError('* The password is too weak');
          } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
            setError('* The email address is already in use');
          } else {
            console.log(err.message);
          }
        });
    }
  };
  return (
    <div className="auth-container">
      <span className="auth-nav">
        <Link to="/login">Login</Link>
        <Link to="/signUp">Sign Up</Link>
      </span>
      <div className="auth-form-container">
        <p className="auth-sign-up-title">Bebop Bounty</p>
        <form className="auth-form" onSubmit={handleSignUp}>
          <div className="auth-form-input">
            <label>
              Username:
              <input
                required
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="auth-form-input">
            <label>
              E-mail:
              <input
                required
                type="email"
                htmlFor="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="auth-form-input">
            <label>
              Password:
              <input
                style={{ width: 326 }}
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="auth-form-input">
            <label>
              Confirm Password:
              <input
                style={{ width: 271 }}
                required
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          {error ? <small className="login-error">{error}</small> : null}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="auth-form-submit-btn">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
