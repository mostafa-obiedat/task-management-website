import React from 'react';
import '../styles/Aboutus.css';
import aboutImage from '../images/about_us.jpg';
import herocontact from '../images/herocontact.jpg';
import { Link } from 'react-router-dom';



function AboutUs() {
  return (
    <div>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

      {/* ✅ الـ Hero Section مع النص داخله */}
      <section className="hero-section position-relative text-white text-center" style={{ minHeight: '50vh', position: 'relative' }}>
        <img
          src={herocontact}
          className="img-fluid w-100"
          alt="Contact Us"
          style={{ objectFit: 'cover', height: '50vh' }}
        />

        {/* ✅ Overlay خلف النص لجعله أكثر وضوحًا */}
        <div className="overlay position-absolute top-0 left-0 w-100 h-100" style={{
          background: 'rgba(0, 0, 0, 0.5)', // شفافية داكنة 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <h1 className="fw-bold" style={{ fontSize: '2.5rem', textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}>About TickDone</h1>
          <p className="lead w-75 mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
            At TickDone, we are passionate about transforming how teams manage and collaborate on tasks. Our innovative platform offers efficient task management solutions designed to maximize productivity, streamline communication, and improve overall workflow.
          </p>
        </div>
      </section>




      {/* ✅ About Us Section */}
      <section id="about-section" className="pt-5 pb-5">
        <div className="container wrapabout">
          <div className="row">
            <div className="col-lg-6 align-items-center justify-content-left d-flex mb-5 mb-lg-0">
              <div className="blockabout">
                <div className="blockabout-inner text-center text-sm-start">
                  <div className="title-big pb-3 mb-3">

                  </div>
                  <p className="description-p text-muted pe-0 pe-lg-0">
                    At TickDone, we are a team of experienced professionals focused on delivering state-of-the-art task management solutions. We are committed to helping businesses, teams, and individuals boost their productivity through powerful and easy-to-use tools.
                  </p>
                  <p className="description-p text-muted pe-0 pe-lg-0">
                    Our platform is designed to simplify task tracking, foster collaboration, and ensure timely completion of projects. Whether you're managing small tasks or large-scale projects, TickDone is here to support your goals every step of the way.
                  </p>
                  <div className="sosmed-horizontal pt-3 pb-3">
                    <a href="#/"><i className="fa fa-facebook"></i></a>
                    <a href="#/"><i className="fa fa-instagram"></i></a>
                    <a href="#/"><i className="fa fa-pinterest"></i></a>
                  </div>
                  <a href="#/" className="btn rey-btn mt-3">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-5 mt-lg-0">
              <figure className="potoaboutwrap">
                <img src={aboutImage} alt="About Us" />
              </figure>
            </div>
          </div>
        </div>
      </section>






      <div className="container overflow-hidden">
        <div className="row gy-4 gy-lg-0 mb-5 mt-3">
          <div className="col-4 col-lg-4">
            <article>
              <div className="card border-0">
                <img
                  className="card-img-top img-fluid m-0"
                  loading="lazy"
                  src="https://i.pinimg.com/736x/22/70/72/22707253a86e574ad47d83c7e128d6d4.jpg"
                  alt="Our Vision"
                />
                <div className="card-body border bg-white p-4">
                  <div className="entry-header mb-3">
                    <h2 className="card-title entry-title h4 mb-0">
                      <a className="link-dark text-decoration-none" href="#!">
                        Our Vision
                      </a>
                    </h2>
                  </div>
                  <p className="card-text entry-summary text-secondary mb-3">
                    Our vision is to empower businesses and teams to efficiently manage
                    tasks, improve collaboration, and streamline processes, enabling
                    them to achieve their goals with ease and precision.
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-4 col-lg-4">
            <article>
              <div className="card border-0">
                <img
                  className="card-img-top img-fluid m-0"
                  loading="lazy"
                  src="https://i.pinimg.com/736x/5a/9d/f2/5a9df22ecd73b8663e493c67327b048c.jpg"
                  alt="Our Approach"
                />
                <div className="card-body border bg-white p-4">
                  <div className="entry-header mb-3">
                    <h2 className="card-title entry-title h4 mb-0">
                      <a className="link-dark text-decoration-none" href="#!">
                        Our Approach
                      </a>
                    </h2>
                  </div>
                  <p className="card-text entry-summary text-secondary mb-3">
                    We take a tailored approach to task management by offering flexible
                    solutions that fit your unique business needs, helping your team
                    stay organized and productive with real-time updates and efficient
                    tracking systems.
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-4 col-lg-4">
            <article>
              <div className="card border-0">
                <img
                  className="card-img-top img-fluid m-0"
                  loading="lazy"
                  src="https://i.pinimg.com/736x/b0/43/27/b0432756f13d9c98f49878d88fef310c.jpg"
                  alt="Our Solutions"
                />
                <div className="card-body border bg-white p-4">
                  <div className="entry-header mb-3">
                    <h2 className="card-title entry-title h4 mb-0">
                      <a className="link-dark text-decoration-none" href="#!">
                        Our Solutions
                      </a>
                    </h2>
                  </div>
                  <p className="card-text entry-summary text-secondary mb-3">
                    Our task management solutions are designed to improve team
                    collaboration, task tracking, and project visibility, ensuring
                    that your team can work together effectively to meet deadlines and
                    achieve project success.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>




      <section className="py-3 py-md-5">
        <div className="container">
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6">
              <img
                className="img-fluid rounded"
                loading="lazy"
                src="https://i.pinimg.com/736x/cf/5e/ee/cf5eee44494f5020af695d9dbda04f75.jpg"
                alt="About 2"
              />
            </div>
            <div className="col-12 col-lg-6">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-10">
                  <h2 className="mb-3 h4">Why Choose Us?</h2>
                  <p className="lead fs-4 mb-3 mb-xl-5">
                    With years of experience in management task optimization, we
                    provide innovative solutions to streamline your processes, enhance
                    productivity, and drive success for your organization.
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ color: "#B7A3F7" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="fs-5 m-0">
                        Our task management solutions are designed to improve efficiency.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ color: "#B7A3F7" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="fs-5 m-0">
                        We provide real-time tracking and collaboration tools to help
                        you stay on top of every task.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-4 mb-xl-5">
                    <div className="me-3" style={{ color: "#B7A3F7" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        fill="currentColor"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div>
                      <p className="fs-5 m-0">
                        Let us help you achieve your team’s goals with seamless task
                        delegation and time management.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/Contact"
                    className="btn rey-btn mt-3 text-decoration-none"
                  >
                    Connect Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;