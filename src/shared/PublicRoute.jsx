import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import supabase  from "../supabase/supabaseClient";
import useAuthStore from "../zustand/useAuthStore";

// Supabase 인증 정보 확인
const fetchAuthUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
};

const PublicRoute = () => {
  const { user, setUser } = useAuthStore();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    onSuccess: (fetchedUser) => {
      if (fetchedUser) setUser(fetchedUser);
    },
    onError: () => {
    setUser(null); // 로그인 정보가 없으면 상태 초기화
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
