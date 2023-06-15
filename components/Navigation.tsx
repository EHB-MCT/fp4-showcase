import { faAddressCard, faArrowRightFromBracket, faCaretDown, faCaretUp, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { logoutUser } from '../lib/auth';
import { UserContext } from '../lib/context';
import style from '../styles/Navigation.module.css';
import NavigationDropdown from './NavigationDropdown';

const Navigation: React.FC = () => {
    const router = useRouter();
    const currentRoute = router.pathname;
    const { user } = useContext(UserContext);
    const [userObject, setUserObject] = useState();
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/users/${user.uid}`);
                const data = await res.json();
                setUserObject(data);
                setUsername(data.username);
            } catch (e) {
                console.error('Error fetching user object: ', e);
            }
        };
        fetchData();
    }, [user]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleSignOut = () => {
        logoutUser();
        closeDropdown();
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navDropDownItems = [
        {
            title: 'View Profile',
            href: user ? `/profile/${user.uid}` : `/`,
            icon: {
                name: faAddressCard,
                color: '#ffffff',
                style: { width: 20, height: 20 },
            },
            closeDropdown: closeDropdown,
            viewableFor: 'student',
        },
        {
            title: 'Add Project',
            href: `/projects/upload`,
            icon: {
                name: faPlus,
                color: '#ffffff',
                style: { width: 20, height: 20 },
            },
            closeDropdown: closeDropdown,
            viewableFor: 'student',
        },
        {
            title: 'Sign Out',
            href: `/`,
            icon: {
                name: faArrowRightFromBracket,
                color: '#ffffff',
                style: { width: 20, height: 20 },
            },
            closeDropdown: handleSignOut,
            viewableFor: 'all',
        },
    ];

    const renderLoggedInState = () => {
        if (username && isLoggedIn) {
            return (
                <div className="dropdown">
                    <div className={style.dropdown_toggle} onClick={toggleDropdown}>
                        <FontAwesomeIcon icon={faUser} color="#ffffff" style={{ width: 20, height: 20 }} />
                        {username}
                        {isOpen && <FontAwesomeIcon icon={faCaretUp} color="#ffffff" style={{ width: 20, height: 20 }} />}
                        {!isOpen && <FontAwesomeIcon icon={faCaretDown} color="#ffffff" style={{ width: 20, height: 20 }} />}
                    </div>
                    {isOpen && <NavigationDropdown items={navDropDownItems} user={userObject} />}
                </div>
            );
        } else {
            return (
                <div className={style.register}>
                    <Link href="/register">
                        <a className={currentRoute === '/register' ? `${style.active}` : ``}>Log in</a>
                    </Link>
                    {/* <span className={style.divider}>/</span>
            <Link href="/register">
              <a
                className={currentRoute === "/register" ? `${style.active}` : ""}
              >
                Sign up
              </a>
            </Link> */}
                </div>
            );
        }
    };

    return (
        <>
            <div className={style.navigation_wrapper}>
                <div className={`${style.navigation} containerWidth`}>
                    <Link href="/">
                        <svg
                            onClick={closeDropdown}
                            className={style.logo}
                            xmlns="http://www.w3.org/2000/svg"
                            width="111.443"
                            height="61.413"
                            viewBox="0 0 111.443 61.413"
                        >
                            <path
                                id="Path_1253"
                                data-name="Path 1253"
                                d="M65,0V.009l-.009,0L39.808,45.071,14.163,30.687,46.442,12.616V0L.208,25.895,0,26.011V35.4L46.033,61.179l.407.234,24.9-45.24L97.281,30.72,65.21,48.675,65,48.792V61.408l46.234-25.895.208-.116V26.011L76.653,6.525l.012-.021L67.8,1.569Z"
                                transform="translate(0)"
                                fill="#fff"
                                opacity="0.998"
                            />
                        </svg>
                    </Link>
                    <div className={style.links}>
                        <div className={style.cut}></div>
                        <Link href="/">
                            <a onClick={closeDropdown} className={currentRoute === '/' ? `${style.active}` : ''}>
                                Home
                            </a>
                        </Link>
                        <Link href="/awards">
                            <a onClick={closeDropdown} className={currentRoute === '/awards' ? `${style.active}` : ''}>
                                Awards
                            </a>
                        </Link>
                        <Link href="/about">
                            <a onClick={closeDropdown} className={currentRoute === '/about' ? `${style.active}` : ''}>
                                About
                            </a>
                        </Link>
                        {renderLoggedInState()}
                    </div>
                    <div className={style.mobile_menu_toggle} onClick={toggleMobileMenu}>
                        <div className={style.hamburger_icon}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className={style.mobile_menu}>
                        <div className={style.mobile_menu_links}>
                            <div style={{ color: 'black' }} className={style.mobile_menu_close} onClick={closeMobileMenu}>
                                X
                            </div>
                            <Link href="/">
                                <a onClick={closeMobileMenu} style={{ color: 'black', paddingBottom: '4vh' }}>
                                    Home
                                </a>
                            </Link>
                            <Link href="/awards">
                                <a onClick={closeMobileMenu} style={{ color: 'black', paddingBottom: '4vh' }}>
                                    Awards
                                </a>
                            </Link>
                            <Link href="/about">
                                <a onClick={closeMobileMenu} style={{ color: 'black', paddingBottom: '4vh' }}>
                                    About
                                </a>
                            </Link>
                            {renderLoggedInState()}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navigation;
