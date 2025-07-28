import { Router } from '@/shared/Router';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Loading } from '@/components/common/Loading';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary customMessage="에러가 발생했습니다.">
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
      <ToastContainer position="bottom-center" autoClose={1000} />
    </AuthProvider>
  );
}

export default App;
