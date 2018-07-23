import * as React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="topNav">
      <Link className={location.pathname === '/' ? 'active' : null} to="/">
        Ticker
      </Link>&nbsp;
      <Link
        className={location.pathname === '/prices' ? 'active' : null}
        to="/prices"
      >
        Prices
      </Link>
    </div>
  );
};

export default Nav;
