import * as React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Nav from './Components/Nav.component.jsx';
import Ticker from './Pages/Ticker.page.jsx';
import Prices from './Pages/Prices.page.jsx';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Ticker} />
          <Route path="/prices" component={Prices} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
