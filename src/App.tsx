import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { Dashboard } from './pages/Dashboard';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (user) {
    return <Dashboard />;
  }

  return isLoginMode ? (
    <LoginForm onToggleMode={() => setIsLoginMode(false)} />
  ) : (
    <SignupForm onToggleMode={() => setIsLoginMode(true)} />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb'
          }
        }}
      />
    </AuthProvider>
  );
}

export default App;