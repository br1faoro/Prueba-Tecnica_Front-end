export const MIN_SEARCH_LENGTH = 4;
export const EXCLUDED_WORDS = new Set(['iseijasunow']);

interface ValidationResult {
  error: boolean;
  message: string;
}

export const validateSearch = (search: string): ValidationResult => {
  const trimmedSearch = search.trim().toLowerCase();

  if (trimmedSearch.length < MIN_SEARCH_LENGTH) {
    return {
      error: true,
      message: `Search term must be at least ${MIN_SEARCH_LENGTH} characters long`,
    };
  }

  if (EXCLUDED_WORDS.has(trimmedSearch)) {
    return {
      error: true,
      message: `The word "${trimmedSearch}" is not allowed in the search term`,
    };
  }

  if (!/^[a-z0-9\s]+$/.test(trimmedSearch)) {
    return {
      error: true,
      message: 'Search term can only contain letters, numbers, and spaces',
    };
  }

  return {
    error: false,
    message: 'Search term is valid',
  };
};
