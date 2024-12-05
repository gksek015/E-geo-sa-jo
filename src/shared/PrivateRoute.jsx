import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import useAuthStore from '../zustand/useAuthStore';

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('User retrieval error:', error);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
