import { render, screen } from '@testing-library/react';
import LogIn from '../pages/LogIn.jsx';

function sel(id) {
  return `[data-testid="${id}"]`;
}

test('LogIn component check', () => {
  render(<LogIn />);
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
