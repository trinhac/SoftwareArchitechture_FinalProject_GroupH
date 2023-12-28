import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet, Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
        {/* <Link to="/admin">Go to Admin Page</Link> */}
        <Header />
        <Outlet />
    </main>
  )
}

export default Home
