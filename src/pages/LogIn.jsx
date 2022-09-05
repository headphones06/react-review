import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LogIn.scss';

export function LogIn() {
  return (
    <div>
      <Header />
      <main className="signin">
        <br />
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="login-form">
          <label className="email-label">メールアドレス</label>
          <br />
          <input type="email" className="email-input" onChange={handleEmailChange} />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input type="password" className="password-input" onChange={handlePasswordChange} />
          <br />
          <button type="button" className="login-button" onClick={onLogIn}>
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
}
