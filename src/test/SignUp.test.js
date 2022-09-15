import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { SignUp } from '../pages/SignUp.jsx';

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

test('SignUp component check', () => {
  render(<SignUp />, container);

  const mailText = screen.getByLabelText('メールアドレス');
  const mailElem = screen.find(sel('email'));
  expect(mailText).toBeInTheDocument();
  expect(mailElem).toBeInTheDocument();

  const nameText = screen.getByLabelText('ユーザー名');
  const nameElem = screen.find(sel('name'));
  expect(nameText).toBeInTheDocument();
  expect(nameElem).toBeInTheDocument();

  const passText = screen.getByLabelText('パスワード');
  const passElem = screen.find(sel('password'));
  expect(passText).toBeInTheDocument();
  expect(passElem).toBeInTheDocument();

  const btn = screen.getByRole('button', { name: '新規作成' });
  expect(btn).toBeInTheDocument();

  const linkElem = screen.getByText('戻る');
  expect(linkElem).toBeInTheDocument();
});
