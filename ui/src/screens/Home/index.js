import { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getUserGists, getUser, searchUsers } from 'api/github';
import ConfigContext from 'contexts/config';

import User from 'screens/layout/components/User';
import Search from './components/Search';
import GistList from './components/GistList';

import './style.css'

const Home =  () => {
  const [gists, setGists] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const { config: {isLoggedIn} } = useContext(ConfigContext);

  const selectUser = async (user) => {
    setSelectedUser(user);
    setGists([]);
    const userGists = await getUserGists(user.login);
    setGists(userGists);
  }

  const { username } = useParams();
  if (username && !selectedUser) {
    getUser(username).then(selectUser);
  }

  return (
    <div className="home-screen">
      <h2 className="headline">Blog msco.</h2>
      <p className="tagline">
        Explore the unknown. Uncover what matters. Prototype, test, repeat.
        Combine intuition with evidence. Design with intent and build it right.
        Never stop having fun.
      </p>
      <Search onSearch={searchUsers} onUserSelect={selectUser} />
      {selectedUser && (
        <div className="actions">
            <User
              username={selectedUser.login}
              avatar={selectedUser.avatar_url} />
          {isLoggedIn && (
              <Link to="/form">
                <div className="call-to-action">
                  New Post
                </div>
              </Link>
          )}
        </div>
      )}
      <GistList records={gists}/>
    </div>);
}

export default Home
