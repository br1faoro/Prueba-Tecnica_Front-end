import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';
import { searchUsers, fetchUserDetailsByUsername } from '@users/api/users-api';
import { User, SearchUsersResponse, UseUserSearchParams } from '@features/users/types';

export const useUserSearch = ({ search, options }: UseUserSearchParams): UseQueryResult<SearchUsersResponse, Error> => {
  return useQuery({
    queryKey: ['search', { search }],
    queryFn: () => searchUsers(search),
    placeholderData: keepPreviousData,
    ...options,
  });
};

export const useUserDetailsByUsername = (username: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ['user', { username }],
    queryFn: () => fetchUserDetailsByUsername(username),
    placeholderData: keepPreviousData,
  });
};
