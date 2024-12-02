import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabaseClient";
import useAuthStore from "../zustand/useAuthStore";

const fetchUserData = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
};

const PrivateRoute = () => {
  const { user, setUser } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    onSuccess: (fetchedUser) => {
      setUser(fetchedUser);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
