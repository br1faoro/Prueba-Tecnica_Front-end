import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { validateSearch } from '@/utils/input-validations';

interface UsersSearchFormProps {
  onSearch: (term: string) => void;
}

const UsersSearchForm: React.FC<UsersSearchFormProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationResult = validateSearch(search);

    if (validationResult.error) {
      setError(validationResult.message);
    } else {
      setError(null);
      onSearch(search);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    const validationResult = validateSearch(value);
    setError(validationResult.error ? validationResult.message : null);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        data-error={error ? 'true' : 'false'}
        className="form form--search"
      >
        <div className="form__group">
          <label htmlFor="search" className="form__label">
            Search by username
          </label>
          <input
            ref={inputRef}
            onChange={handleInputChange}
            type="text"
            id="search"
            value={search}
            name="search"
            className="form__input"
            placeholder="E.g. mojombo"
          />
          <p data-visible={error ? 'true' : 'false'} className="form__error">
            {error}
          </p>
        </div>
        <button type="submit" disabled={!search.trim() || !!error} className="form__button">
          Search
        </button>
      </form>
    </div>
  );
};

export default UsersSearchForm;
