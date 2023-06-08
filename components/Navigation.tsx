import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

const Navigation: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { user } = useContext(UserContext);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            <Link
                                href="/"
                                className="text-gray-300 text-center hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                onClick={closeMenu}
                            >
                                <a>FinalShow - Showcase {user?.email}</a> 
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen ? 'true' : 'false'}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg
                                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link
                        href="/awards"
                        className="text-gray-300 text-center hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={closeMenu}
                    >
                       <a>Awards</a>
                    </Link>
                    {/* <Link
                        href="/projects"
                        className="text-gray-300 text-center hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={closeMenu}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/profile/1"
                        className="text-gray-300 text-center hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={closeMenu}
                    >
                        Profile
                    </Link> */}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
