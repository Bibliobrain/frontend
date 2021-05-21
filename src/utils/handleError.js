import { useNotification } from '../hooks/stores/useNotifications';

const handleError = (error, asNotification = true) => {
  if (asNotification) {
    useNotification
      .getState()
      .setNotification(error?.response.data.message || error.message);
  }
  if (error?.response.data.errors.length) {
    return error?.response.data.errors.reduce((acc, error) => {
      acc[error.source] = error.message;
      return acc;
    }, {});
  }
};

export { handleError };
