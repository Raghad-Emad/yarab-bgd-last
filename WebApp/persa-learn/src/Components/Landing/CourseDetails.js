import React from 'react';
import { Link, useParams } from 'react-router-dom';
import coursesData from '../../courses.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseDetails = () => {
  

  const { courseName } = useParams();

  const course = coursesData.courses.find(course => course.courseName === courseName);

  if (!course) {
    return <div className="container mt-5">Course not found</div>;
  }

  return (
    <div className="container pb-4">
      <h1 className='pt-5'>{course.courseTitle}</h1>
      <p>{course.description}</p>
      <p>Price: {course.price}</p>
      <p>Category: {course.category}</p>
    </div>
  );
};

export default CourseDetails;
