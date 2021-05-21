import { Navigate, Route, Routes } from 'react-router-dom';

import { PageNotFound } from '../../components/errors/PageNotFound';
import { withLoginRequired } from '../../components/hoc/withLoginRequired';
import { withRoleRequired } from '../../components/hoc/withRoleRequired';

import { Login } from './Login';

const LoansNew = withLoginRequired(
  withRoleRequired('astronaunt', () => {
    return <h1>Loans - New</h1>;
  })
);

const Staff = () => {
  return (
    <Routes>
      <Route element={<Navigate to='loans' />} path='' />
      <Route element={<Login />} path='login' />
      <Route element={<LoansNew />} path='loans/new' />
      <Route element={<h1>Loans - Return</h1>} path='loans/return' />
      <Route element={<h1>Members - New</h1>} path='members/new' />
      <Route element={<PageNotFound />} path='*' />
    </Routes>
  );
};

export { Staff };
