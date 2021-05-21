import axios from 'axios';
import { useMutation } from 'react-query';

import { handleError } from '../../utils/handleError';
import { useAuth } from '../stores/useAuth';

const login = async ({ password, ssn }) => {
  try {
    const response = await axios.post('/auth/login', {
      password,
      ssn,
    });
    const { accessToken, refreshToken } = response.data.payload;
    useAuth.getState().set({
      accessToken,
      refreshToken,
    });
    return response.data.payload;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

const useLogin = (options) => {
  return useMutation(({ password, ssn }) => login({ password, ssn }), options);
};

export { useLogin };
