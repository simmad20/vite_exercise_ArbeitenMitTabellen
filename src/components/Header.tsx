import { Link } from 'react-router-dom';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <nav className='container'>
                <Link className='link' to="/">Home</Link>
                <Link className='link' to="/html-table">HTML-Table</Link>
                <Link className='link' to="/mui-table">MUI-Table</Link>
            </nav>
        </header>
    );
};

export default Header;