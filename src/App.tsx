import { Router } from '@/shared/Router';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { Loading } from '@/components/common/Loading';
import { Error } from '@/components/common/Error';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
      <ToastContainer position="bottom-center" autoClose={1000} />
    </AuthProvider>
  );
}

export default App;
