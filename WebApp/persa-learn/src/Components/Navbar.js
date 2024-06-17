import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { MdMenu } from "react-icons/md";
import coursesData from '../courses.json';
import './header.css';

const Navbar = () => {
  const [navVisibility, setNavVisibility] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isTeacher, setIsTeacher] = useState(
    sessionStorage.getItem("teacher") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("admin") === "true"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();

  const navToggle = () => {
    setNavVisibility(!navVisibility);
  };

  const logout = (e) => {
    navigate("/", {});
    sessionStorage.clear();
    window.location.reload();
  };

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/signup");
  };

  const handleMouseEnter = (menu, category = null) => {
    setActiveMenu(menu);
    setActiveCategory(category);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setActiveCategory(null);
    setDropdownOpen(false);
  };

  const handleCategoryClick = (menu, category) => {
    setActiveMenu(menu);
    setActiveCategory(category === activeCategory ? null : category);
  };

  return (
    <header  >
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='container'>
      <Link className="navbar-brand" to="/">Tech Magnet</Link>
      
      <button
        className={styles.mobile_nav_toggle}
        aria-controls="primary-navigation"
        aria-expanded={navVisibility}
        onClick={navToggle}
      >
        <MdMenu aria-label="menu" />
      </button>
        <ul 
          id="primary-navigation"
          data-visible={navVisibility}
          className='navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-around w-100'
        >
          <li
            className={`nav-item dropdown ${activeMenu === 'Courses' ? 'show' : ''}`}
            onMouseEnter={() => handleMouseEnter('Courses')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              onClick={() => handleCategoryClick('Courses', 'Courses')}
              aria-expanded={navVisibility}
            >
              Courses
            </Link>
            <ul
              className={`dropdown-menu ${dropdownOpen && activeMenu === 'Courses' ? 'show' : ''}`}
              aria-labelledby="navbarDropdown"
            >
              {getCoursesByCategory().map((category) => (
                <li
                  key={category.category}
                  className="dropdown-submenu"
                  onMouseEnter={() => handleMouseEnter('Courses', category.category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => handleCategoryClick('Courses', category.category)}
                  >
                    {category.category}
                  </Link>
                  {activeCategory === category.category && (
                    <ul className="dropdown-menu show">
                      {category.courses.map((course) => (
                        <li key={course.id}>
                          <Link
                            className="dropdown-item"
                            to={`/course/${course.courseName}`}
                            onClick={() => {
                              setDropdownOpen(false);
                              setActiveCategory(null);
                              setActiveMenu(null);
                            }}
                          >
                            {course.courseName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li
            className={`nav-item dropdown ${activeMenu === 'About' ? 'show' : ''}`}
            onMouseEnter={() => handleMouseEnter('About')}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarAbout"
              role="button"
              onClick={() => handleCategoryClick('About', 'About')}
              aria-expanded={navVisibility}
            >
              Objectives
            </Link>
            <ul
              className={`dropdown-menu ${dropdownOpen && activeMenu === 'About' ? 'show' : ''}`}
              aria-labelledby="navbarAbout"
            >
              {getCoursesByCategory().map((category) => (
                <li
                  key={category.category}
                  className="dropdown-submenu"
                  onMouseEnter={() => handleMouseEnter('About', category.category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => handleCategoryClick('About', category.category)}
                  >
                    {category.category}
                  </Link>
                  {activeCategory === category.category && (
                    <ul className="dropdown-menu show">
                      {category.courses.map((course) => (
                        <li key={course.id}>
                          <Link
                            className="dropdown-item"
                            to={`/course/${course.courseName}`}
                            onClick={() => {
                              setDropdownOpen(false);
                              setActiveCategory(null);
                              setActiveMenu(null);
                            }}
                          >
                            {course.courseName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/account">Profile</Link>
                  </li>
                </>
              ) : !isTeacher ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/classes">Classes</Link>
                  </li>
                  <li>
                    <Link to="/revision">Revision</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/classes">Classes</Link>
                  </li>
                  <li>
                    <Link to="/details_teacher">Profile</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={logout}>Logout</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/zoom-meeting">Join Zoom Meeting</Link>
              </li>
            </>
          )}
        </ul>
        </div>
      </nav>
    </header>
  );

  function getCoursesByCategory() {
    const coursesByCategory = coursesData.courses.reduce((acc, course) => {
      const existingCategory = acc.find((item) => item.category === course.category);
      if (existingCategory) {
        existingCategory.courses.push(course);
      } else {
        acc.push({ category: course.category, courses: [course] });
      }
      return acc;
    }, []);
    return coursesByCategory;
  }
};

export default Navbar;
