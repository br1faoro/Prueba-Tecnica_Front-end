import { useUserDetailsByUsername } from '@/features/users/services/users-services';

export const useGetUser = (username: string) => {
  const { data: user, isLoading, error } = useUserDetailsByUsername(username);

  return {
    user,
    isLoading,
    error,
  };
};

export default useGetUser;
