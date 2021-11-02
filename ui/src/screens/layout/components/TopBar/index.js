import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { tryLogin } from 'api/github';
import { logout } from 'api/backend';
import ConfigContext from 'contexts/config';
import User from 'screens/layout/components/User';

import './style.css';

const TopBar = () => {
  const { config, setConfig } = useContext(ConfigContext);
  const { isLoggedIn, user } = config;

  const onLoginClicked = async () => {
    const result = await tryLogin(config);
    setConfig({
      ...config,
      isLoggedIn: result
    });
  };

  const onLogoutClicked = async () => {
    await logout();
    setConfig({
      ...config,
      isLoggedIn: false
    })
  };

  return (<header className="top-bar">
    <div className="logo">
      <Link to="/">
        Blog
      </Link>
    </div>
    {!isLoggedIn && (
      <div className="login-container">
        <span className="login" onClick={onLoginClicked}>Log In</span>
      </div>
    )}

    {user && (
    <div className="user-container">
      <User username={user.info.name} avatar={user.info.image} />
      <div className="logout-container">
        <span className="logout" onClick={onLogoutClicked}>Log Out</span>
      </div>
    </div>)}
  </header>);
}
export default TopBar;
