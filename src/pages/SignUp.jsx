import React from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.scss';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState('');
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleIconChange = (e) => setIcon(e.target.value);

  const onSignUp = () => {
    const data = { name, email, password };
    axios
      .post(`https://api-for-missions-and-railways.herokuapp.com/signup`, data)
      .then(() => {
        useNavigate('/');
      })
      .catch((err) => {
        setErrorMessage(`新規作成に失敗しました。${err}`);
      });
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
          <button type="button" className="signup-button" data-testid="upBtn" onClick={onSignUp}>
            新規作成
          </button>
        </form>
        <Link to="/login">戻る</Link>
      </main>
    </div>
  );
}
