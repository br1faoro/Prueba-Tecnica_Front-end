import { renderHook } from '@testing-library/react';
import { useGetUser } from '@/features/users/hooks/use-get-user';
import { useUserDetailsByUsername } from '@/features/users/services/users-services';
import { MOCK_USER } from '@tests/__mocks__';

jest.mock('@/features/users/services/users-services');

describe('useGetUser Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    (useUserDetailsByUsername as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    const { result } = renderHook(useGetUser, { initialProps: 'johnDoe' });
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(useUserDetailsByUsername).toHaveBeenCalledWith('johnDoe');
  });

  it('returns user data when fetch is successful', () => {
    (useUserDetailsByUsername as jest.Mock).mockReturnValue({
      data: MOCK_USER,
      isLoading: false,
      error: null,
    });
    const { result } = renderHook(useGetUser, { initialProps: 'johnDoe' });
    expect(result.current.user).toEqual(MOCK_USER);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(useUserDetailsByUsername).toHaveBeenCalledWith('johnDoe');
  });

  it('returns error when fetch fails', () => {
    const mockError = new Error('Failed to fetch user details');
    (useUserDetailsByUsername as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });
    const { result } = renderHook(useGetUser, { initialProps: 'johnDoe' });
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(mockError);
    expect(useUserDetailsByUsername).toHaveBeenCalledWith('johnDoe');
  });

  it('updates user when username changes', () => {
    const { rerender } = renderHook(({ username }) => useGetUser(username), {
      initialProps: { username: 'johnDoe' },
    });
    expect(useUserDetailsByUsername).toHaveBeenCalledWith('johnDoe');
    rerender({ username: 'johnDoe2' });
    expect(useUserDetailsByUsername).toHaveBeenCalledWith('johnDoe2');
  });
});
