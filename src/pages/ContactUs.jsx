import React, { useState } from 'react';
import { database, ref, set } from '../firebase/firebaseConfig';
import '../styles/contactus.css';
import herocontact from '../images/herocontact.jpg';

function ContactUs() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [emailError, setEmailError] = useState('');

    // دالة التحقق من صحة البريد الإلكتروني
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // تحقق من صحة البريد الإلكتروني
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        // إرسال البيانات إلى قاعدة البيانات
        const newContactRef = ref(database, 'contacts/' + Date.now());
        set(newContactRef, formData)
            .then(() => {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' }); // مسح البيانات بعد الإرسال
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    };

    return (
        <div className="contact">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <section className="hero-section position-relative text-white text-center" style={{ minHeight: '50vh', position: 'relative' }}>
                <img
                    src={herocontact}
                    className="img-fluid w-100"
                    alt="Contact Us"
                    style={{ objectFit: 'cover', height: '50vh' }}
                />
                <div className="overlay position-absolute top-0 left-0 w-100 h-100" style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '20px'
                }}>
                    <h1 className="fw-bold" style={{ fontSize: '2.5rem', textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}>We're here to help!</h1>
                    <p className="lead w-75 mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
                        Don't hesitate to reach out to us for more information, any questions, or inquiries about our services.
                        We're always ready to help you find the best solutions to meet your needs!
                    </p>
                </div>
            </section>

            <div id="contact" className="contact-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="contact">
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {/* عرض رسالة الخطأ في حال كان البريد الإلكتروني غير صالح */}
                                            {emailError && <small className="text-danger">{emailError}</small>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                name="subject"
                                                className="form-control"
                                                placeholder="Subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <textarea
                                                rows="6"
                                                name="message"
                                                className="form-control"
                                                placeholder="Your Message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <button type="submit" className="btn btn-contact-bg">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="single_address">
                                <i className="fa fa-map-marker"></i>
                                <h4>Our Address</h4>
                                <p>King Abdullah II Street, Amman, Jordan</p>
                            </div>
                            <div className="single_address">
                                <i className="fa fa-envelope"></i>
                                <h4>Send your message</h4>
                                <p>contact@tickdone.jo</p>
                            </div>
                            <div className="single_address">
                                <i className="fa fa-phone"></i>
                                <h4>Call us on</h4>
                                <p>(+962) 6 555 1234</p>
                            </div>
                            <div className="single_address">
                                <i className="fa fa-clock-o"></i>
                                <h4>Work Time</h4>
                                <p>Mon - Fri: 08:00 - 16:00 <br />Sat: 10:00 - 14:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;