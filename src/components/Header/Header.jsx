import React from 'react';
import Container from '../container/Container';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },{
            name: 'About',
            slug: '/about',
            active: !authStatus
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'Get the App',
            slug: '/get-app',
            active: !authStatus
        },{
            name: 'QR Code',
            slug: '/qr-code',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        }
    ];

    return (
        <header className='py-3 shadow bg-blue-400'>
            <Container>
                <nav className='flex items-center justify-between'>
                    <Link to="/" className='flex items-center'>
                        <div className='w-26 h-16'> {/* Adjust width and height as needed */}
                            <Logo />
                        </div>
                    </Link>
                    <div className='flex-grow flex-1 items-center justify-evenly'>
                        <ul className='flex space-x-9 items-center'>
                            {navItems.map((item) => item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='bg-none border-none flex cursor-pointer rounded-full px-8 py-2 font-semibold text-white text-xl hover:bg-blue-600'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null)}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
