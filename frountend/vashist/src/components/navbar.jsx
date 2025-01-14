import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../asserts/bicycle.gif';
import '../styles/navbar.css';

function Navbar() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const token = document.cookie.includes('jwt');
        
        {
            if(!token){
                setIsLoggedIn(false)
            }
            else{
                setIsLoggedIn(true)
            }
        }
    });

    const isFindPage = location.pathname === '/find';
    const isProductDetailPage = location.pathname.startsWith('/find/');


    
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                window.location.href = '/'; 
                setIsLoggedIn(false)
            } else {
                console.log(response)
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Link to="/"><img className='image' src={logo} alt='GearUpCycle-logo' /></Link>
                        <span className="ml-3 text-xl font-semibold"><Link to="/">GareUpCycle</Link></span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <a className="mr-5 hover:text-gray-900"><Link to="/">Home</Link></a>
                        <a className="mr-5 hover:text-gray-900"><Link to="/about">About</Link></a>
                        <a className="mr-5 hover:text-gray-900"><Link to="/contact">Contact</Link></a>
                        
                            <div className='mr-5 hover:text-gray-900' ><Link to="/register">Register</Link></div>
                        
                            <div className='mr-5 hover:text-gray-900'><Link to="/login">Login</Link></div>
                        
                            <button onClick={handleLogout} className="mr-5 hover:text-gray-900">Logout</button>
                        
                        
                    </nav>
                    {!isProductDetailPage && !isFindPage && (
                        <button className="inline-flex items-center bg-red-400 border-1 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-white mt-4 md:mt-0">
                            <Link to="/find">Find A Cycle</Link>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Navbar;
