import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import coursesData from '../courses.json';

const CourseDropDown = () => {
  const navigate = useNavigate();

  const handleSelectCourse = (event) => {
    const selectedCourseId = event.target.value;
    if (selectedCourseId) {
      navigate(`/course/${selectedCourseId}`);
    }
  };

  return (
    // <div className="container mt-5">
    //   <select className="form-select" onChange={handleSelectCourse}>
    //     <option value="">Select a course</option>
    //     {coursesData.courses.map((course) => (
    //       <option key={course.id} value={course.id.toString()}>
    //         {course.courseName} - {course.category}
    //       </option>
    //     ))}
    //   </select>
    // </div>
    <div className="container mt-5">
      <h2>Choose a Course</h2>
      <ul className="list-group">
        {coursesData.map(course => (
          <li key={course.id} className="list-group-item">
          <Link to={`/course/${course.id}`}>{course.courseName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDropDown;
