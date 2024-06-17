import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="py-3 bg-dark text-white">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <h5 className="text-uppercase mb-3">Tech Magnet</h5>
            <p className="mb-2" style={{ fontSize: '14px' }}>
              The Greek Campus, Greek building unit G108,<br />
              171 Tahrir street, Ad Dawawin, Abdeen, Cairo
            </p>
            <p className="mb-2" style={{ fontSize: '14px' }}>+20221600462</p>
            <p className="mb-0" style={{ fontSize: '14px' }}>
              <a href="mailto:hello@gomycode.com" className="text-white">hello@gomycode.com</a>
            </p>
          </div>
          <div className="col-lg-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-white">Courses</a></li>
              <li><a href="#" className="text-white">Hackerspaces</a></li>
              <li><a href="#" className="text-white">GOMYTECH</a></li>
              <li><a href="#" className="text-white">About GOMYCODE</a></li>
              <li><a href="#" className="text-white">Careers</a></li>
              <li><a href="#" className="text-white">GOMYCODE Policy</a></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">LinkedIn</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <hr className="w-100" style={{ borderColor: '#fff' }} />
            <p className="mb-0" style={{ fontSize: '12px', marginTop: '10px' }}>
              &copy; 2024 TECH MAGNET. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
