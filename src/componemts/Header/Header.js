import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    const [user] = useAuthState(auth)
    const handleSignOut = () => {
        signOut(auth)
    }
    return (
        <div className='header'>
            <nav>
                <img src={logo} alt="" />

            </nav>
            <div>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Oders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user ?
                        <button onClick={handleSignOut}>Sign Out</button>
                        :
                        <Link to="/login">Login</Link>
                }
            </div>
        </div>
    );
};

export default Header;