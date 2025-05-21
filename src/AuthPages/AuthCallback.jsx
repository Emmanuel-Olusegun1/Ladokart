import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/dashboard'); // Redirect after successful auth
      } else if (event === 'SIGNED_OUT') {
        navigate('/login?error=auth_failed');
      }
    });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Authenticating...</h2>
      </div>
    </div>
  );
}