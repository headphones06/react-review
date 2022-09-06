import { render, screen } from '@testing-library/react';
import LogIn from '../pages/LogIn.jsx';

function sel(id) {
  return `[data-testid="${id}"]`;
}

test('SignUp component check', () => {
  render(<LogIn />);
  const mailText = screen.getByLabelText('メールアドレス');
  const mailElem = wrapper.find(sel('email'));
  expect(mailText).toBeInTheDocument();
  expect(mailElem).toBeInTheDocument();

  const userText = screen.getByLabelText('ユーザー名');
  const userElem = wrapper.find(sel('user'));
  expect(userText).toBeInTheDocument();
  expect(userElem).toBeInTheDocument();

  const passText = screen.getByLabelText('パスワード');
  const passElem = wrapper.find(sel('password'));
  expect(passText).toBeInTheDocument();
  expect(passElem).toBeInTheDocument();

  const btn = screen.getByRole('button', { name: '送信' });
  expect(btn).toBeInTheDocument();

  const linkElem = screen.getByText('戻る');
  expect(linkElem).toBeInTheDocument();
});
