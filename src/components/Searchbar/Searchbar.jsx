import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchInput,
  BtnSpan,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const onInputChange = e => {
    setSearchValue(e.currentTarget.value);
  };

  const onSearchSubmit = e => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      return toast.error('Упссс!!! Картинки не найдены.');
    }

    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onSearchSubmit}>
        <SearchButton type="submit">
          <BtnSpan>Search</BtnSpan>
        </SearchButton>

        <SearchInput
          autoComplete="off"
          autoFocus
          type="text"
          placeholder="Search images and photos"
          value={searchValue}
          onChange={onInputChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
