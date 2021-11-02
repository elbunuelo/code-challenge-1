import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Switch } from 'react-router-dom';

import useDebounce from 'hooks/useDebounce';
import Search from 'screens/Home/components/Search';

jest.mock('hooks/useDebounce', () => ({
  __esModule: true,
  default: (debounce) => (...args) => { debounce(...args)}
}));

describe('Search Component', () => {
  const renderSearch = (onSearch = null, onUserSelect = null) => {
    let _onSearch = onSearch;
    if (!_onSearch) {
      _onSearch = () => Promise.resolve()
    }

    let _onUserSelect = onUserSelect;
    if (!onUserSelect) {
      _onUserSelect = () => {};
    }

    render(
    <MemoryRouter>
      <Search onSearch={_onSearch} onUserSelect={_onUserSelect} />
    </MemoryRouter>);
  }

  it('Should render the search input', () => {
    renderSearch();
    const searchInput = screen.getByPlaceholderText('Find a user...');
    expect(searchInput).not.toBeUndefined()
  });

  it('Should set the value when typing on the sarch input', async () => {
    renderSearch();
    const searchInput = screen.getByPlaceholderText('Find a user...');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Hello World'}});
    })

    expect(searchInput.value).toEqual('Hello World');
  });

  it('Should call onSearch when the search input value changes', () => {
    const onSearch = jest.fn();
    renderSearch(onSearch);

    const searchInput = screen.getByPlaceholderText('Find a user...');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Hello World'}});
    })

    expect(onSearch).toHaveBeenCalledWith('Hello World');
  });
});
