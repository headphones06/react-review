import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const form = new FormData();
  const [icon, setIcon] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleIconChange = (e) => {
    new Compressor(e.target.files[0], {
      quality: 0.6,
      success(result) {
        form.append('icon', result, result.name);
        console.log(form.get('icon'));
        setIcon(form.get('icon'));
        console.log(icon);
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
          validationSchema={validation()}
          onSubmit={(values) => {
            axios
              .post(`https://api-for-missions-and-railways.herokuapp.com/users`, values)
              .then((res) => {
                const { token } = res.data;
                setCookie('token', token, { secure: true, sameSite: 'None' });
                axios
                  .post(`https://api-for-missions-and-railways.herokuapp.com/uploads`, icon, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${cookies.token}`,
                    },
                  })
                  .then(() => {
                    console.log('user create successed');
                    navigate('/');
                  })
                  .catch((err) => {
                    setErrorMessage(`新規作成(icon)に失敗しました。${err}`);
                  });
              })
              .catch((err) => {
                setErrorMessage(`新規作成(user)に失敗しました。${err}`);
              });
          }}
        >
          {(props) => (
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
        </Formik>
        <Link to="/login">戻る</Link>
      </main>
    </div>
  );
}
