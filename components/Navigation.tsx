import { faAddressCard, faArrowRightFromBracket, faCaretDown, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { logoutUser } from '../lib/auth';
import { UserContext } from '../lib/context';
import style from '../styles/Navigation.module.css';

const Navigation: React.FC = () => {
    const router = useRouter();
    const currentRoute = router.pathname;
    const { user } = useContext(UserContext);
    const [userObject, setUserObject] = useState();
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                if (user?.uid == undefined || user?.uid == null) return;
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

    const renderLoggedInState = () => {
        if (username && isLoggedIn) {
            return (
                <div className="dropdown">
                    <div className={style.dropdown_toggle} onClick={toggleDropdown}>
                        <FontAwesomeIcon icon={faUser} color="#ffffff" style={{ width: 20, height: 20 }} />
                        {username}
                        {isOpen && <FontAwesomeIcon icon={faCaretDown} rotation={180} color="#ffffff" style={{ width: 20, height: 20 }} />}
                        {!isOpen && <FontAwesomeIcon icon={faCaretDown} color="#ffffff" style={{ width: 20, height: 20 }} />}
                    </div>
                    {isOpen && (
                        <div className={style.dropdown_wrapper}>
                            <Link href={`/profile/${user.uid}`}>
                                <a onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faAddressCard} color="#ffffff" style={{ width: 20, height: 20 }} />
                                    View Profile
                                </a>
                            </Link>
                            <Link href="/projects/upload">
                                <a className={currentRoute === '/register' ? `${style.active}` : ''} onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faPlus} color="#ffffff" style={{ width: 20, height: 20 }} />
                                    Add Project
                                </a>
                            </Link>
                            <Link href="/register">
                                <a
                                    className={currentRoute === '/register' ? `${style.active}` : ''}
                                    onClick={() => {
                                        closeDropdown();
                                        logoutUser();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} flip={'horizontal'} color="#ffffff" style={{ width: 20, height: 20 }} />
                                    Sign out
                                </a>
                            </Link>
                        </div>
                    )}
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
            <div className={`${style.navigation} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
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
            </div>
        </>
    );
};

export default Navigation;
