import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/useAuthStore";

const fetchAuthUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

const PublicRoute = () => {
  const { user, setUser } = useAuthStore();

  const { data, isLoading } = useQuery(["authUser"], fetchAuthUser, {
    onSuccess: (fetchedUser) => {
      if (fetchedUser) setUser(fetchedUser);
    },
    onError: () => {
      setUser(null); 
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
