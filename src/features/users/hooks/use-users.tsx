import { useState } from 'react';
import { useUserSearch } from '@/features/users/services/users-services';
import { UseUsersResult } from '@/features/users/types';

export const useUsers = (): UseUsersResult => {
  const [search, setSearch] = useState<string>('');

  const {
    data: searchResults,
    isLoading: isSearching,
    error: searchError,
  } = useUserSearch({ search, options: { enabled: !!search } });

  const handleSearch = (term: string) => {
    setSearch(term);
  };

  const users = searchResults?.items || [];

  return {
    users,
    isLoading: isSearching,
    error: searchError,
    search,
    handleSearch,
  };
};
