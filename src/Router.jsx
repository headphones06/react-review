import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReviewList } from './pages/ReviewList.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { LogIn } from './pages/LogIn.jsx';
import { SignUp } from './pages/SignUp.jsx';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ReviewList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
