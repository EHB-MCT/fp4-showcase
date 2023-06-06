import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';

const Navigation: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="container">
                <Link legacyBehavior href="/" passHref>
                    <a className="navbar-brand">Logo</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link legacyBehavior href="/" passHref>
                                <a className="nav-link">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link legacyBehavior href="/projects" passHref>
                                <a className="nav-link">Projects</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link legacyBehavior href="/awards" passHref>
                                <a className="nav-link">Awards</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link legacyBehavior href="/profile/1" passHref>
                                <a className="nav-link">Profile</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
