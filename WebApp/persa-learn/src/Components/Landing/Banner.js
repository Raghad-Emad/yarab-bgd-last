import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <div className="jumbotron jumbotron-fluid text-center">
      <div className="container p-5">
        <h1 className="display-4 p-2 pt-5">Build your skills</h1>
        <h1 className="display-4 p-2">Build your portfolio</h1>
        <h1 className="display-4 p-2">From Zero To Hero</h1>
        <ul className="list-inline mt-4">
          <li className="list-inline-item p-2 border">UX Design</li>
          <li className="list-inline-item p-2 border">Web Development</li>
          <li className="list-inline-item p-2 border">Graphic Design</li>
          <li className="list-inline-item p-2 border">Data Science</li>
          <li className="list-inline-item p-2 border">Digital Marketing</li>
          <li className="list-inline-item p-2 border">Digital Marketing</li>
        </ul>
        <button className="btn btn-primary btn-lg start-now">Get Started</button>
      </div>
    </div>
  );
}

export default Banner;
