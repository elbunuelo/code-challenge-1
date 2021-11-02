import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import User from 'screens/layout/components/User';
import useDebounce from 'hooks/useDebounce';
import './style.css';

const Search = ({ onSearch, onUserSelect }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const performSearch = useDebounce(async () => {
    const results = await onSearch(search);
    if (results) {
      setResults(results);
    }
  });

  useEffect(() => {
    if (search.trim() === '') {
      setResults([]);
      return
    }

    performSearch();
  }, [search]);

  const recordClick = (user) => {
    setSearch('');
    onUserSelect(user)
  }

  return (
    <div className="search">
      <div className="search-input">
        <FontAwesomeIcon className="icon" icon={faSearch}/>
        <input placeholder="Find a user..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      { !!results.length && (
        <div className="search-results">
          { results.map((result) => (
            <Link key={result.id} className="result" to={`/user/${result.login}`} onClick={() => recordClick(result)} >
              <User username={result.login} avatar={result.avatar_url} />
            </Link>
          ))}
          </div>)}
    </div>
  );
}
export default Search;
