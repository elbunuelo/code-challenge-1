import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { fetchConfig } from './api/backend';
import ConfigContext from './contexts/config';
import TopBar from './screens/layout/components/TopBar';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Form from './screens/Form';
import  { initialize } from './api/github';

import './App.css';

const App = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    fetchConfig().then(setConfig)
  }, [config.isLoggedIn])

  useEffect(() => { initialize(config) }, [config]);

  return (
    <Router>
      <ConfigContext.Provider value={{config,setConfig}}>
        <TopBar />
        <div className="body">
        <div className="blog">
          <Switch >
            <Route path="/form">
              <Form />
            </Route>
            <Route path="/gist/:id">
              <Detail />
            </Route>
            <Route path="/user/:username">
              <Home />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
      </ConfigContext.Provider>
    </Router>
  );
}

export default App;
