import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { LogIn } from '../pages/LogIn.jsx';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function sel(id) {
  return `[data-testid="${id}"]`;
}

test('LogIn component check', () => {
  render(<LogIn />, container);

  const mailText = screen.getByLabelText('メールアドレス');
  const mailElem = screen.getByRole('textbox', { name: 'メールアドレス' });
  expect(mailText).toBeInTheDocument();
  expect(mailElem).toBeInTheDocument();

  const passText = screen.getByLabelText('パスワード');
  const passElem = screen.find(sel('password'));
  expect(passText).toBeInTheDocument();
  expect(passElem).toBeInTheDocument();

  const btn = screen.getByRole('button', { name: 'ログイン' });
  expect(btn).toBeInTheDocument();

  const linkElem = screen.getByText('新規作成');
  expect(linkElem).toBeInTheDocument();
});

//テスト駆動開発
