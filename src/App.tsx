import { Router } from '@/shared/Router';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router />
      <ToastContainer position="bottom-center" autoClose={1000} />
    </AuthProvider>
  );
}

export default App;
