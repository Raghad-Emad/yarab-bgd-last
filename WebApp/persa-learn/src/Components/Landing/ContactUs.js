import React, { useState } from 'react';
import './MastertheEssentials.css';
import './ContactUs.css'
import bg from '../../src/bg.jpg';


function ContactUs() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can do whatever you want with the form data
        console.log(formData);
    };

    return (
        <div className="container achievments-parent">
            <div className="achievments">
                <p className='header-text'>Contact Us</p>
                <div className='row'>
                    <div className='col-sm-4'>
                        <img className='bg' src={bg} />
                    </div>
                    <div className='col-sm-8'>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-column align-items-center">
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="firstName" className="form-label text-start">First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="lastName" className="form-label text-start">Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="email" className="form-label text-start">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="phoneNumber" className="form-label text-start">Phone Number:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg contactus">Contact Us</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs