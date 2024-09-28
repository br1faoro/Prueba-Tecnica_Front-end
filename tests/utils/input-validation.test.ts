import { MIN_SEARCH_LENGTH, EXCLUDED_WORDS, validateSearch } from '@/utils/input-validations';

describe('validateSearch', () => {
  it('returns error when search term is empty', () => {
    const result = validateSearch('');
    expect(result).toEqual({
      error: true,
      message: `Search term must be at least ${MIN_SEARCH_LENGTH} characters long`,
    });
  });

  it('returns error when search term is less than minimum length', () => {
    const result = validateSearch('abc');
    expect(result).toEqual({
      error: true,
      message: `Search term must be at least ${MIN_SEARCH_LENGTH} characters long`,
    });
  });

  it('returns error when search term is in excluded words', () => {
    EXCLUDED_WORDS.add('iseijasunow');
    const result = validateSearch('iseijasunow');
    expect(result).toEqual({
      error: true,
      message: `The word "iseijasunow" is not allowed in the search term`,
    });
    EXCLUDED_WORDS.delete('iseijasunow');
  });

  it('is case insensitive when checking excluded words', () => {
    EXCLUDED_WORDS.add('iseijasunow');
    const result = validateSearch('iseijasunOW');
    expect(result).toEqual({
      error: true,
      message: `The word "iseijasunow" is not allowed in the search term`,
    });
    EXCLUDED_WORDS.delete('iseijasunow');
  });

  it('returns error when search term contains invalid characters', () => {
    const result = validateSearch('valid123!');
    expect(result).toEqual({
      error: true,
      message: 'Search term can only contain letters, numbers, and spaces',
    });
  });

  it('returns error when search term contains uppercase letters but valid characters', () => {
    const result = validateSearch('ValidUser');
    expect(result).toEqual({
      error: false,
      message: 'Search term is valid',
    });
  });

  it('trims whitespace and validates correctly', () => {
    const result = validateSearch('   valid user   ');
    expect(result).toEqual({
      error: false,
      message: 'Search term is valid',
    });
  });

  it('allows spaces in the search term', () => {
    const result = validateSearch('valid user');
    expect(result).toEqual({
      error: false,
      message: 'Search term is valid',
    });
  });

  it('returns valid for search term with numbers and letters', () => {
    const result = validateSearch('user123');
    expect(result).toEqual({
      error: false,
      message: 'Search term is valid',
    });
  });

  it('returns error for search term with special characters', () => {
    const result = validateSearch('user@123');
    expect(result).toEqual({
      error: true,
      message: 'Search term can only contain letters, numbers, and spaces',
    });
  });
});
