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
  const data = new FormData();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleIconChange = (e) => {
    const files = e.target.files[0];
    if (!files) {
      return;
    }
    new Compressor(files, {
      height: 200,
      width: 300,
      quality: 0.6,
      success(result) {
        data.append('icon', result, result.name);
        previewFile(result);
      },
      error(err) {
        setErrorMessage(`画像圧縮に失敗しました。${err}`);
      },
    });
  };

  function previewFile(file) {
    const preview = document.getElementById('preview');
    const child = preview.childNodes;
    const reader = new FileReader();

    reader.onload = function (e) {
      if (child.length == 0) {
        const imageUrl = e.target.result; // URLはevent.target.resultで呼び出せる
        const img = document.createElement('img');
        img.src = imageUrl;
        preview.appendChild(img);
      } else {
        preview.removeChild(child.item(0));
        const imageUrl = e.target.result;
        const img = document.createElement('img');
        img.src = imageUrl;
        preview.appendChild(img);
      }
    };
    reader.readAsDataURL(file);
  }

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
                  .post(`https://api-for-missions-and-railways.herokuapp.com/uploads`, data, {
                    headers: {
                      'Content-type': 'multipart/form-data',
                      Authorization: `Bearer ${cookies.token}`,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
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
            <form className="signup__form" onSubmit={props.handleSubmit}>
              <label className="signup__form--label">メールアドレス</label>
              <br />
              <input
                data-testid="email"
                type="email"
                name="email"
                className="signup__form--input"
                value={props.values.email}
                onChange={props.handleChange}
              />
              <Error data-testid="email-err">{props.errors.email}</Error>
              <br />
              <label className="signup__form--label">ユーザー名</label>
              <br />
              <input
                data-testid="name"
                type="text"
                name="name"
                className="signup__form--input"
                value={props.values.name}
                onChange={props.handleChange}
              />
              <Error data-testid="name-err">{props.errors.name}</Error>
              <br />
              <label className="signup__form--label">パスワード</label>
              <br />
              <input
                data-testid="password"
                type="password"
                name="password"
                className="signup__form--input"
                value={props.values.password}
                onChange={props.handleChange}
              />
              <Error data-testid="password-err">{props.errors.password}</Error>
              <br />
              <label className="signup__form--label">アイコン</label>
              <br />
              <input
                type="file"
                data-testid="icon"
                className="icon"
                accept="image/png, image/jpg"
                onChange={handleIconChange}
              />
              <div id="preview"></div>
              <br />
              <button type="submit" className="signup__form--button" data-testid="upBtn">
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
