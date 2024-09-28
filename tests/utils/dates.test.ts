import { formatDate } from '@/utils/dates';

describe('Dates Utils', () => {
  it('should use the correct date format options', () => {
    const date = '2024-06-15T12:00:00Z';
    const spy = jest.spyOn(Date.prototype, 'toLocaleDateString');
    formatDate(date);
    expect(spy).toHaveBeenCalledWith(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    spy.mockRestore();
  });

  it('should handle invalid date input', () => {
    const invalidDate = 'not-a-date';
    const formattedDate = formatDate(invalidDate);
    expect(formattedDate).toBe('Invalid Date');
  });
});
