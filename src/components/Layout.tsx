import Header from './Header';
import { Outlet } from 'react-router-dom';
import React from 'react';

const Layout: React.FC = () => {
    return (
        <div className='container_root'>
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;