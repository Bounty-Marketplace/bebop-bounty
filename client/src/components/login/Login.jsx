/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  onAuthStateChanged,
} from 'firebase/auth';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext.jsx';
import { auth } from '../../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserData } = useContext(GlobalContext);

  const sendUserDataToServer = (user) => {
    if (user) {
      axios
        .get(`/api/users/${user.uid}?auth=true`)
        .then((response) => {
          console.log('RESPONSEE DATA', response.data[0]);
          setUserData(response.data[0]);
          navigate('/bounty-page');
        })
        .catch((err) => console.log('Err in sendUserDataToServer: ', err));
    }
  };
  useEffect(() => {
    const keepLogin = onAuthStateChanged(auth, (user) => {
      console.log('login: ', user);
      sendUserDataToServer(user);
    });
    return keepLogin;
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const { user } = userCredential;
            console.log('user', user);
            sendUserDataToServer(user);
          })
          .catch((err) => {
            if (
              err.code === AuthErrorCodes.INVALID_PASSWORD ||
              err.code === AuthErrorCodes.USER_DELETED
            ) {
              setError('* The email address or password is incorrect');
            } else {
              console.log(err.message);
            }
          });
      })
      .catch((err) => {
        console.log('Err in setPersistence: ', err.message);
      });
  };

  return (
    <div className="auth-container">
      <span className="auth-nav">
        <Link to="/login">Login</Link>
        <Link to="/signUp">Sign Up</Link>
      </span>
      <div className="auth-form-container">
        <p className="auth-form-title">Bebop Bounty</p>
        <form className="auth-form" onSubmit={handleSignIn}>
          <div className="auth-form-input">
            <label>
              E-mail:
              <input
                style={{ width: 325, marginBottom: 15 }}
                required
                type="email"
                name="email"
                htmlFor="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="auth-form-input">
            <label>
              Password:
              <input
                style={{ width: 309 }}
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error ? <small className="login-error">{error}</small> : null}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="auth-form-submit-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
