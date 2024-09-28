import { render, screen, fireEvent } from '@testing-library/react';
import { UsersSearchForm } from '@/features/users/components';
import { validateSearch } from '@/utils/input-validations';

jest.mock('@/utils/input-validations', () => ({
  validateSearch: jest.fn(),
}));

describe('UsersSearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<UsersSearchForm onSearch={mockOnSearch} />);
    expect(screen.getByLabelText(/search by username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. mojombo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('focuses the input on mount', () => {
    render(<UsersSearchForm onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/e.g. mojombo/i)).toHaveFocus();
  });

  it('validates input and shows error message', () => {
    (validateSearch as jest.Mock).mockReturnValue({ error: true, message: 'Invalid search term' });
    render(<UsersSearchForm onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/e.g. mojombo/i);
    fireEvent.change(input, { target: { value: 'invalid' } });
    expect(screen.getByText('Invalid search term')).toBeInTheDocument();
  });

  it('calls onSearch with valid input', () => {
    (validateSearch as jest.Mock).mockReturnValue({ error: false, message: '' });
    render(<UsersSearchForm onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/e.g. mojombo/i);
    fireEvent.change(input, { target: { value: 'validUser' } });
    const form = screen.getByText((_, element) => element!.tagName.toLowerCase() === 'form');
    fireEvent.submit(form);
    expect(mockOnSearch).toHaveBeenCalledWith('validUser');
  });

  it('disables the submit button when input is empty or invalid', () => {
    (validateSearch as jest.Mock).mockReturnValue({ error: true, message: 'Invalid search term' });
    render(<UsersSearchForm onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/e.g. mojombo/i);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeDisabled();
    fireEvent.change(input, { target: { value: 'invalid' } });
    expect(button).toBeDisabled();
    (validateSearch as jest.Mock).mockReturnValue({ error: false, message: '' });
    fireEvent.change(input, { target: { value: 'validUser' } });
    expect(button).not.toBeDisabled();
  });

  it('does not call onSearch and sets error when submitting with invalid input', () => {
    (validateSearch as jest.Mock).mockReturnValue({ error: true, message: 'Invalid search term' });
    render(<UsersSearchForm onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/e.g. mojombo/i);
    fireEvent.change(input, { target: { value: 'invalid' } });
    const form = screen.getByText((_, element) => element!.tagName.toLowerCase() === 'form');
    fireEvent.submit(form);
    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(screen.getByText('Invalid search term')).toBeInTheDocument();
  });
});
