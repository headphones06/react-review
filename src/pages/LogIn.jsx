import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import '../styles/LogIn.scss';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onLogIn = () => {
    axios
      .post(`https://api-for-missions-and-railways.herokuapp.com/signin`, { email, password })
      .then(() => {
        useNavigate('/');
      })
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
  };

  return (
    <div>
      <main className="login">
        <br />
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => console.log(values)}
          render={(props) => (
            <form className="login-form" onSubmit={props.handleSubmit}>
              <label className="email-label">メールアドレス</label>
              <br />
              <input
                data-testid="email"
                type="email"
                className="email-input"
                value={props.values.email}
                onChange={handleEmailChange}
              />
              <br />
              <label className="password-label">パスワード</label>
              <br />
              <input
                data-testid="password"
                type="password"
                className="password-input"
                value={props.values.password}
                onChange={handlePasswordChange}
              />
              <br />
              <button type="button" className="login-button" data-testid="inBtn" onClick={onLogIn}>
                ログイン
              </button>
            </form>
          )}
        />
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
}
