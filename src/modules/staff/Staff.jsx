import { Navigate, Route, Routes } from 'react-router-dom';

import { PageNotFound } from '../../components/errors/PageNotFound';

import { Login } from './Login';
import { NewLoan } from './NewLoan';
import { NewMember } from './NewMember';
import { ReturnLoan } from './ReturnLoan';

const Staff = () => {
  return (
    <Routes>
      <Route element={<Navigate to='loans' />} path='' />
      <Route element={<Login />} path='login' />
      <Route element={<NewLoan />} path='loans/new' />
      <Route element={<ReturnLoan />} path='loans/return' />
      <Route element={<NewMember />} path='members/new' />
      <Route element={<PageNotFound />} path='*' />
    </Routes>
  );
};

export { Staff };
