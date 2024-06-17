import React from 'react';
import './Achievments.css';

function Achievments() {
  return (
    <div className="container achievments-parent">
      <div className="row achievments">
        <div className="col-sm-6">
          <p>This is the left paragraph. It takes 50% of the parent width.</p>
        </div>
        <div className="col-sm-6">
          <p>This is the right paragraph. It takes 50% of the parent width.</p>
        </div>
      </div>
    </div>
  )
}

export default Achievments