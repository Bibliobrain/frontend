import { useMemo } from 'react';

import { parseJWT } from '../utils/parseJWT';

import { useAuth } from './stores/useAuth';

const useDecodedJWT = () => {
  const refreshToken = useAuth((state) => state.refreshToken);
  return useMemo(
    () => (refreshToken ? parseJWT(refreshToken) : {}),
    [refreshToken]
  );
};

export { useDecodedJWT };
