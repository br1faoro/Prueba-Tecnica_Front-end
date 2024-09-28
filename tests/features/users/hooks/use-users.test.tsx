import { useUserSearch } from '@/features/users/services/users-services';
import { useUsers } from '@/features/users/hooks/use-users';
import { renderHook, act } from '@testing-library/react';
import { SEARCH_RESULTS } from '@tests/__mocks__';

jest.mock('@/features/users/services/users-services');

describe('useUsers Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return search results when a search is performed', async () => {
    (useUserSearch as jest.Mock).mockReturnValue({
      data: SEARCH_RESULTS,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.handleSearch('searchuser');
    });

    expect(result.current.search).toBe('searchuser');
    expect(result.current.users).toEqual(SEARCH_RESULTS.items);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state when performing a search', () => {
    (useUserSearch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.handleSearch('searchuser');
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state from user search', () => {
    (useUserSearch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to search users'),
    });

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.handleSearch('searchuser');
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(new Error('Failed to search users'));
  });
});
