import axios from 'axios';
import { fetchUserDetailsByUsername, searchUsers } from '@features/users/api/users-api';
import { User, SearchUsersResponse } from '@/features/users/types';
import { MOCK_USER, MOCK_USER_ARRAY } from '@tests/__mocks__';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const URL = process.env.VITE_GITHUB_API_URL as string;
const PER_PAGE = process.env.VITE_GITHUB_PER_PAGE as string;

describe('users-api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUserDetailsByUsername', () => {
    it('should fetch user details successfully', async () => {
      const username = 'john_doe';
      mockedAxios.get.mockResolvedValueOnce({ data: MOCK_USER });
      const result = await fetchUserDetailsByUsername(username);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${URL}/users/${username}`);
      expect(result).toEqual(MOCK_USER);
    });

    it('should throw an error when fetching user details fails', async () => {
      const username = 'john_doe';
      const mockError = new Error('Network Error');
      mockedAxios.get.mockRejectedValueOnce(mockError);
      await expect(fetchUserDetailsByUsername(username)).rejects.toThrow('Network Error');
      expect(mockedAxios.get).toHaveBeenCalledWith(`${URL}/users/${username}`);
    });
  });

  describe('searchUsers', () => {
    it('should search users and fetch their details successfully', async () => {
      const searchQuery = 'john';
      const mockSearchResponse: SearchUsersResponse = {
        total_count: 2,
        incomplete_results: false,
        items: MOCK_USER_ARRAY,
      };
      const mockUserDetails: User[] = MOCK_USER_ARRAY;
      mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResponse });
      mockUserDetails.forEach((user, _) => {
        mockedAxios.get.mockResolvedValueOnce({ data: user });
      });
      const result = await searchUsers(searchQuery);
      expect(mockedAxios.get).toHaveBeenNthCalledWith(1, `${URL}/search/users`, {
        params: { q: searchQuery, per_page: PER_PAGE },
      });
      mockUserDetails.forEach((user, index) => {
        expect(mockedAxios.get).toHaveBeenNthCalledWith(index + 2, `${URL}/users/${user.login}`);
      });
      expect(result).toEqual({
        ...mockSearchResponse,
        items: mockUserDetails,
      });
    });

    it('should return empty items if no users found', async () => {
      const searchQuery = 'no_results';
      const mockSearchResponse: SearchUsersResponse = {
        total_count: 0,
        incomplete_results: false,
        items: [],
      };
      mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResponse });
      const result = await searchUsers(searchQuery);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${URL}/search/users`, {
        params: { q: searchQuery, per_page: PER_PAGE },
      });
      expect(result).toEqual(mockSearchResponse);
    });

    it('should throw an error when searching users fails', async () => {
      const searchQuery = 'john';
      const mockError = new Error('Search failed');
      mockedAxios.get.mockRejectedValueOnce(mockError);
      await expect(searchUsers(searchQuery)).rejects.toThrow('Search failed');
      expect(mockedAxios.get).toHaveBeenCalledWith(`${URL}/search/users`, {
        params: { q: searchQuery, per_page: PER_PAGE },
      });
    });

    it('should throw an error when fetching user details fails during search', async () => {
      const searchQuery = 'john';
      const mockSearchResponse: SearchUsersResponse = {
        total_count: 1,
        incomplete_results: false,
        items: MOCK_USER_ARRAY,
      };
      const mockError = new Error('Failed to fetch user details');
      mockedAxios.get.mockResolvedValueOnce({ data: mockSearchResponse });
      mockedAxios.get.mockRejectedValueOnce(mockError);
      await expect(searchUsers(searchQuery)).rejects.toThrow('Failed to fetch user details');
      expect(mockedAxios.get).toHaveBeenNthCalledWith(1, `${URL}/search/users`, {
        params: { q: searchQuery, per_page: PER_PAGE },
      });
      expect(mockedAxios.get).toHaveBeenNthCalledWith(2, `${URL}/users/johnDoe`);
    });
  });
});
