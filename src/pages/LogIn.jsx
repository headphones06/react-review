import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../styles/LogIn.scss';

const Error = styled.span`
  color: red;
`;

const validation = () =>
  Yup.object().shape({
    email: Yup.string().email('メールアドレスの形式で入力してください').required('必須項目です'),
    password: Yup.string().required('必須項目です'),
  });

export function LogIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <div>
      <main className="login">
        <br />
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validation()}
          onSubmit={(values) => {
            axios
              .post(`https://api-for-missions-and-railways.herokuapp.com/signin`, values)
              .then((res) => {
                setCookie('token', res.data.token, { secure: true, sameSite: 'None' });
                navigate('/');
              })
              .catch((err) => {
                setErrorMessage(`ログインに失敗しました。${err}`);
              });
          }}
        >
          {(props) => (
            <form className="login__form" onSubmit={props.handleSubmit}>
              <label className="login__form--label">メールアドレス</label>
              <br />
              <input
                data-testid="email"
                type="email"
                name="email"
                className="input"
                value={props.values.email}
                onChange={props.handleChange}
              />
              <Error data-testid="email-err">{props.errors.email}</Error>
              <br />
              <label className="login__form--label">パスワード</label>
              <br />
              <input
                data-testid="password"
                type="password"
                name="password"
                className="input"
                value={props.values.password}
                onChange={props.handleChange}
              />
              <Error>{props.errors.password}</Error>
              <br />
              <button type="submit" className="login__button" data-testid="inBtn">
                ログイン
              </button>
            </form>
          )}
        </Formik>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
}
