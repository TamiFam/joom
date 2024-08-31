import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: currentUser, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return null;
      }
      try {
        const res = await axiosSecure.get(`/user/${user.email}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    },
    enabled: !!user?.email && !!localStorage.getItem('token')
  });

  return { currentUser, isLoading, refetch };
};

export default useUser;