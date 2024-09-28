import axios from 'axios';
import { User, SearchUsersResponse } from '@features/users/types';

const URL = process.env.VITE_GITHUB_API_URL as string;
const PER_PAGE = process.env.VITE_GITHUB_PER_PAGE as string;

export const searchUsers = async (search: string): Promise<SearchUsersResponse> => {
  const params = {
    q: search,
    per_page: PER_PAGE as string,
  };

  const { data } = await axios.get<SearchUsersResponse>(`${URL}/search/users`, { params });

  const userDetailsPromises = await Promise.all(
    data.items.map(async (user: User) => {
      const userDetails = await fetchUserDetailsByUsername(user.login);
      return { ...user, ...userDetails };
    })
  );

  return { ...data, items: userDetailsPromises };
};

export const fetchUserDetailsByUsername = async (username: string): Promise<User> => {
  const { data } = await axios.get<User>(`${URL}/users/${username}`);

  return data;
};
