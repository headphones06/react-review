import React from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Compressor from 'compressorjs';
import '../styles/SignUp.scss';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState('');
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleIconChange = (e) => {
    new Compressor(e.target.files[0], {
      quality: 0.6,
      success(result) {
        const formData = new FormData();
        formData.append('file', result, result.name);
        setIcon(formData);
      },
      maxWidth: 1000,
      maxHeight: 400,
      mimeType: 'image/jpg',
      error(err) {
        setErrorMessage(`画像圧縮に失敗しました。${err}`);
      },
    });
  };

  const onSignUp = () => {
    const data = { name, email, password };
    const avater = { icon };
    const dataCheck = false;
    axios
      .post(`https://api-for-missions-and-railways.herokuapp.com/users`, data)
      .then(() => {
        dataCheck = true;
      })
      .catch((err) => {
        setErrorMessage(`新規作成に失敗しました。${err}`);
      });
    if (dataCheck == true) {
      dataCheck = false;
      axios
        .post('https://api-for-missions-and-railways.herokuapp.com/uploads', avater)
        .then(() => {
          useNavigate('/');
        })
        .catch((err) => {
          setErrorMessage(`新規作成に失敗しました。${err}`);
        });
    }
  };

  return (
    <div>
      <main className="signup">
        <br />
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <label className="email-label">メールアドレス</label>
          <br />
          <input data-testid="email" type="email" className="email-input" onChange={handleEmailChange} />
          <br />
          <label className="name-label">ユーザー名</label>
          <br />
          <input data-testid="name" type="text" className="name-input" onChange={handleNameChange} />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input data-testid="password" type="password" className="password-input" onChange={handlePasswordChange} />
          <br />
          <input
            data-testid="icon"
            type="file"
            className="icon"
            accept="image/*,.jpg,.png"
            onChange={handleIconChange}
          />
          <br />
          <button type="button" className="signup-button" data-testid="upBtn" onClick={onSignUp}>
            新規作成
          </button>
        </form>
        <Link to="/login">戻る</Link>
      </main>
    </div>
  );
}
