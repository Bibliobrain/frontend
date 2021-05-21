import create from 'zustand';

const DEFAULT_STATE = {
  accessToken: null,
  refreshToken: null,
};

const useAuth = create((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  reset: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set((state) => ({
      ...DEFAULT_STATE,
      ...state,
    }));
  },
  role: localStorage.getItem('role'),
  set: ({ accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set(() => ({
      accessToken,
      refreshToken,
    }));
  },
  setAccessToken: (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    set((state) => ({
      accessToken,
      ...state,
    }));
  },
}));

export { useAuth };
