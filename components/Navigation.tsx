import {
  faAddressCard,
  faArrowRightFromBracket,
  faCaretDown,
  faCaretUp,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { logoutUser } from "../lib/auth";
import { UserContext } from "../lib/context";
import style from "../styles/Navigation.module.css";
import NavigationDropdown from "./NavigationDropdown";

const Navigation: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { user } = useContext(UserContext);
  const [userObject, setUserObject] = useState();
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      title: "View Profile",
      href: user ? `/profile/${user.uid}` : `/`,
      icon: {
        name: faAddressCard,
        color: "#ffffff",
        style: { width: 20, height: 20 },
      },
      closeDropdown: closeDropdown,
      viewableFor: "student",
    },
    {
      title: "Add Project",
      href: `/projects/upload`,
      icon: {
        name: faPlus,
        color: "#ffffff",
        style: { width: 20, height: 20 },
      },
      closeDropdown: closeDropdown,
      viewableFor: "student",
    },
    {
      title: "Award",
      href: user ? `/awards/upload` : `/`,
      icon: {
        name: faPlus,
        color: "#ffffff",
        style: { width: 20, height: 20 },
      },
      closeDropdown: closeDropdown,
      viewableFor: "admin",
    },
    {
      title: "Sign Out",
      href: `/`,
      icon: {
        name: faArrowRightFromBracket,
        color: "#ffffff",
        style: { width: 20, height: 20 },
      },
      closeDropdown: handleSignOut,
      viewableFor: "all",
    },
  ];

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
        console.error("Error fetching user object: ", e);
      }
    };
    fetchData();
  }, [user]);

  const renderLoggedInState = () => {
    if (username && isLoggedIn) {
      return (
        <div className="dropdown">
          <div className={style.dropdown_toggle} onClick={toggleDropdown}>
            <FontAwesomeIcon
              icon={faUser}
              color="#ffffff"
              style={{ width: 20, height: 20 }}
            />
            {username}
            {isOpen && (
              <FontAwesomeIcon
                icon={faCaretUp}
                color="#ffffff"
                style={{ width: 20, height: 20 }}
              />
            )}
            {!isOpen && (
              <FontAwesomeIcon
                icon={faCaretDown}
                color="#ffffff"
                style={{ width: 20, height: 20 }}
              />
            )}
          </div>
          {isOpen && (
            <NavigationDropdown items={navDropDownItems} user={userObject} />
          )}
        </div>
      );
    } else {
      return (
        <div className={style.register}>
          <Link href="/register">
            <a
              className={currentRoute === "/register" ? `${style.active}` : ``}
            >
              Log in
            </a>
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
            <div className="flex items-center align-middle">
              <a onClick={closeDropdown} className={style.logo}>
                <img
                  className="w-60"
                  src="/images/ehb_logo_horizontal.png"
                  alt="EHB Logo"
                />
              </a>
              <div
                className="border-l-purple-800 border-l-2 ml-4 pl-4 flex items-center"
                style={{ height: "75px" }}
              >
                <h3 className={style.mobileTitleNav}>Showcase</h3>
              </div>
            </div>
          </Link>
          <div className={style.links}>
            <div className={style.cut}></div>
            <Link href="/">
              <a
                onClick={closeDropdown}
                className={currentRoute === "/" ? `${style.active}` : ""}
              >
                Home
              </a>
            </Link>
            <Link href="/awards">
              <a
                onClick={closeDropdown}
                className={currentRoute === "/awards" ? `${style.active}` : ""}
              >
                Awards
              </a>
            </Link>
            <Link href="https://www.erasmushogeschool.be/nl/opleidingen/multimedia-creatieve-technologie">
              <a
                onClick={closeDropdown}
                className={currentRoute === "/about" ? `${style.active}` : ""}
                target="_blank"
              >
                About
              </a>
            </Link>
            {renderLoggedInState()}
          </div>
          <div className={style.mobile_menu_toggle} onClick={toggleMobileMenu}>
            <div className={style.hamburger_icon}>
              <span className={style.line}></span>
              <span className={style.line}></span>
              <span className={style.line}></span>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className={style.mobile_menu}>
          <span className={style.close_icon} onClick={closeMobileMenu}>
            &#x2715;
          </span>
          <div className={style.mobile_menu_links}>
            <Link href="/">
              <a onClick={closeMobileMenu}>Home</a>
            </Link>
            <Link href="/awards">
              <a onClick={closeMobileMenu}>Awards</a>
            </Link>
            <Link href="/about">
              <a onClick={closeMobileMenu}>About</a>
            </Link>
            {renderLoggedInState()}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
