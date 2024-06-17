import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import './MastertheEssentials.css';
import bg from '../../../src/bg.jpg';


function MastertheEssentials() {
  return (
    <div className="container achievments-parent">
      <div className="achievments">
        <p className='header-text'>Master the Essentials</p>
        <div className='row'>
        <ul className="icon-list col-sm-6">
          <li>
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            <p>Zero tech competency needed</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            <p>48 hours with your instructor</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            <p>10 Students max per group</p>
          </li>
        </ul>
        <div className='col-sm-6'>
      <img className='bg' src={bg}/>
    </div>
    </div>

        <button className="btn btn-primary btn-lg start-now">View All Courses</button>
      </div>
    </div>

  )
}

export default MastertheEssentials