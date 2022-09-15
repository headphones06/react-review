import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Compressor from 'compressorjs';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../styles/SignUp.scss';

const Error = styled.span`
  color: red;
`;

const validation = () =>
  Yup.object().shape({
    email: Yup.string().email('メールアドレスの形式で入力してください').required('必須項目です'),
    name: Yup.string().required('必須項目です'),
    password: Yup.string().required('必須項目です'),
  });

export function SignUp() {
  const [errorMessage, setErrorMessage] = useState();
  const [icon, setIcon] = useState('');
  const handleIconChange = (e) => {
    new Compressor(e.target.files[0], {
      quality: 0.6,
      success(result) {
        const formData = new FormData();
        formData.append('file', result, result.name);
        setIcon(formData);
      },
      error(err) {
        setErrorMessage(`画像圧縮に失敗しました。${err}`);
      },
    });
  };

  return (
    <div>
      <main className="signup">
        <br />
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <Formik
          initialValues={{ email: '', name: '', password: '' }}
          avater={icon}
          validationSchema={validation()}
          onSubmit={(values) => {
            axios
              .post(`https://api-for-missions-and-railways.herokuapp.com/uploads`, values)
              .then(() => {
                axios
                  .post(`https://api-for-missions-and-railways.herokuapp.com/users`, avater)
                  .then(() => {
                    useNavigate('/');
                  })
                  .catch((err) => {
                    setErrorMessage(`新規作成に失敗しました。${err}`);
                  });
              })
              .catch((err) => {
                setErrorMessage(`新規作成に失敗しました。${err}`);
              });
          }}
          render={(props) => (
            <form className="signup-form" onSubmit={props.handleSubmit}>
              <label className="email-label">メールアドレス</label>
              <br />
              <input
                data-testid="email"
                type="email"
                name="email"
                className="email-input"
                value={props.values.email}
                onChange={props.handleChange}
              />
              <Error data-testid="email-err">{props.errors.email}</Error>
              <br />
              <label className="name-label">ユーザー名</label>
              <br />
              <input
                data-testid="name"
                type="text"
                name="name"
                className="name-input"
                value={props.values.name}
                onChange={props.handleChange}
              />
              <Error data-testid="name-err">{props.errors.name}</Error>
              <br />
              <label className="password-label">パスワード</label>
              <br />
              <input
                data-testid="password"
                type="password"
                name="password"
                className="password-input"
                value={props.values.password}
                onChange={props.handleChange}
              />
              <Error data-testid="password-err">{props.errors.password}</Error>
              <br />
              <label className="password-label">アイコン</label>
              <br />
              <input data-testid="icon" type="file" className="icon" accept=".jpg,.png" onChange={handleIconChange} />
              <br />
              <button type="submit" className="signup-button" data-testid="upBtn">
                新規作成
              </button>
            </form>
          )}
        />
        <Link to="/login">戻る</Link>
      </main>
    </div>
  );
}
