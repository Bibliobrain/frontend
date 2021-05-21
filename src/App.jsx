import { Helmet } from 'react-helmet';
import {
  useIsFetching,
  QueryClient,
  QueryClientProvider,
  useIsMutating,
} from 'react-query';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { PageNotFound } from './components/errors/PageNotFound';
import { Layout } from './components/Layout';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Notification } from './components/Notification';
import { Catalog } from './modules/Catalog';
import { Staff } from './modules/staff/Staff';

const queryClient = new QueryClient();

const App = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isNetworkRequestInProgress = Boolean(isFetching) || Boolean(isMutating);

  return (
    <>
      <Notification />
      {isNetworkRequestInProgress && <LoadingOverlay />}
      <Helmet titleTemplate='%s | Georgia Tech Library' />
      <Routes>
        <Route element={<Layout />} path='/'>
          <Route element={<Navigate to='catalog/browse' />} path='/' />
          <Route element={<Catalog />} path='catalog/browse' />
          <Route element={<Staff />} path='staff/*' />
          <Route element={<PageNotFound />} path='*' />
        </Route>
      </Routes>
    </>
  );
};

const withProviders = (App) => () =>
  (
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  );

export default withProviders(App);
