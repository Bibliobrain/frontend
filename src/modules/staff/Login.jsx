import {
  Button as MuiButton,
  TextField as MuiTextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { useLogin } from '../../hooks/mutations/useLogin';
import { useNotification } from '../../hooks/stores/useNotifications';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const mutation = useLogin({
    onSuccess: () => {
      navigate('/catalog/browse');
    },
  });
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (searchParams.get('reason') === 'expired') {
      setNotification('Your login expired. Please login again.');
    }
  }, [searchParams, setNotification]);

  const validationErrors = {
    password: mutation.error?.password,
    ssn: mutation.error?.ssn,
  };

  const [{ password, ssn }, setForm] = useState({
    password: '',
    ssn: '',
  });

  const handleSSNChange = ({ target: { value: ssn } }) =>
    setForm((form) => ({
      ...form,
      ssn,
    }));

  const handlePasswordChange = ({ target: { value: password } }) =>
    setForm((form) => ({
      ...form,
      password,
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutation.mutate({
      password,
      ssn,
    });
  };

  if (isAuthenticated) {
    return <Navigate to='/catalog/browse' />;
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify(mutation.error)}</pre>
        <MuiTextField
          error={Boolean(validationErrors.ssn)}
          helperText={validationErrors.ssn}
          label='SSN'
          onChange={handleSSNChange}
          size='small'
          type='text'
          value={ssn}
          variant='outlined'
        />
        <MuiTextField
          error={Boolean(validationErrors.password)}
          helperText={validationErrors.password}
          label='Password'
          onChange={handlePasswordChange}
          size='small'
          type='password'
          value={password}
          variant='outlined'
        />
        <MuiButton color='primary' type='submit' variant='contained'>
          Login
        </MuiButton>
      </form>
    </>
  );
};

export { Login };
