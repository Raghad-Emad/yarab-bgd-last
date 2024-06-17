import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import coursesData from '../courses.json';
import './header.css';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

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
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Tech Magnet</Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${dropdownOpen ? 'show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-around w-100">
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
                  aria-expanded={dropdownOpen}
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
                  aria-expanded={dropdownOpen}
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
              <a className="nav-link" href="contact">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/zoom-meeting">Join Zoom Meeting</Link>
              </li>
            </ul>
          </div>
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
}

export default Header;
