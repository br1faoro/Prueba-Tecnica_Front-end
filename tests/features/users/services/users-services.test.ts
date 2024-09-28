import { renderHook, waitFor } from '@testing-library/react';
import { TanStackQueryProvider } from '@/providers/tanstack-query-provider';
import { useUserSearch, useUserDetailsByUsername } from '@/features/users/services/users-services';
import { fetchUserDetailsByUsername, searchUsers } from '@users/api/users-api';
import { SearchUsersResponse } from '@/features/users/types';
import { MOCK_USER, MOCK_USER_ARRAY } from '@tests/__mocks__';

jest.mock('@users/api/users-api');

const mockSearchUsers = searchUsers as jest.MockedFunction<typeof searchUsers>;
const mockFetchUserDetailsByUsername = fetchUserDetailsByUsername as jest.MockedFunction<
  typeof fetchUserDetailsByUsername
>;

describe('useUserSearch', () => {
  it('should return loading state initially', () => {
    mockSearchUsers.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useUserSearch({ search: 'john', options: {} }), {
      wrapper: TanStackQueryProvider,
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should return data when search is successful', async () => {
    const mockSearchResponse: SearchUsersResponse = {
      total_count: 1,
      incomplete_results: false,
      items: MOCK_USER_ARRAY,
    };
    const mockUserDetails = MOCK_USER;
    mockSearchUsers.mockResolvedValueOnce(mockSearchResponse);
    const { result } = renderHook(() => useUserSearch({ search: 'john', options: {} }), {
      wrapper: TanStackQueryProvider,
    });
    await waitFor(() => result.current.isSuccess);
    expect(mockSearchUsers).toHaveBeenCalledWith('john');
    expect(result.current.data).toEqual({
      ...mockSearchResponse,
      items: [mockUserDetails],
    });
  });

  it('should return error when search fails', async () => {
    const { result } = renderHook(() => useUserSearch({ search: '', options: {} }), {
      wrapper: TanStackQueryProvider,
    });
    await waitFor(() => result.current.isError);
    expect(result.current.data).toBeUndefined();
  });
});

describe('useUserDetailsByUsername', () => {
  it('should return loading state initially', () => {
    mockFetchUserDetailsByUsername.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useUserDetailsByUsername('john_doe'), {
      wrapper: TanStackQueryProvider,
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should return data when fetch is successful', async () => {
    const mockUserDetails = MOCK_USER;
    mockFetchUserDetailsByUsername.mockResolvedValueOnce(mockUserDetails);
    const { result } = renderHook(() => useUserDetailsByUsername('johnDoe'), {
      wrapper: TanStackQueryProvider,
    });
    await waitFor(() => result.current.isSuccess);
    expect(mockFetchUserDetailsByUsername).toHaveBeenCalledWith('johnDoe');
    expect(result.current.data).toEqual(mockUserDetails);
    expect(result.current.error).toBeNull();
  });

  it('should return error when fetch fails', async () => {
    const { result } = renderHook(() => useUserDetailsByUsername(''), {
      wrapper: TanStackQueryProvider,
    });
    await waitFor(() => result.current.isError);
    expect(result.current.data).toBeUndefined();
  });
});
