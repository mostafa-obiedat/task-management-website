import React from "react";
import img1 from '../images/img1.jpg';
import { Link } from 'react-router-dom';


const Home = () => {
  const [expanded, setExpanded] = React.useState(false); // حالة للتحكم في عرض القائمة المنسدلة

  return (
    <div className="overflow-x-hidden ">
      {/* Header Section */}
      <header className="py-4 md:py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a

                className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
              >
                <div className="bg-orange-500 text-purple-500 text-xl font-bold rounded-full ">
                  TickDone
                </div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-900"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
              <Link to="/dashboard" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Dashboard
              </Link>
              <Link to="/About" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                About us
              </Link>
              <Link to="/Contact" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Contact us
              </Link>
            </div>
            {/* Desktop Authentication Links */}
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              <Link to="/Register">
                <button

                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Login
                </button>
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Sign up
              </a>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <nav className={`${expanded ? "block" : "hidden"} lg:hidden`}>
            <div className="px-1 py-8">
              <div className="grid gap-y-7">
                <Link to="/dashboard" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  Dashboard
                </Link>
                <Link to="/aboutus" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  About us
                </Link>
                <Link to="/contactus" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  Contact us
                </Link>
                <a
                  href="#"
                  className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Login
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Sign up
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12  sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="px-6 text-lg text-gray-600 font-inter">
              Organize your tasks with ease, collaborate seamlessly, and stay on track with deadlines. Our platform ensures that your team is always in sync and focused on what matters most.
            </h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              Efficient task management for your team
              <span className="relative inline-flex sm:inline">
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                <span className="relative"> business </span>
              </span>
            </p>

            {/* Buttons */}
            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <Link to="/Register">
                <butoon
                  className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-purple-500 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Get Start
                </butoon>
              </Link>

              <Link to="/Article">
                <button
                  className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Show Articale
                </button>
              </Link>
            </div>

            <p className="mt-8 text-base text-gray-500 font-inter">
              60 Days free trial · No credit card required
            </p>
          </div>
        </div>
        <br></br>
        <br></br>
        {/* Illustration Section */}
        <div className="pb-12 bg-white ">
          <div className="relative">
            <div className="absolute inset-0 h-2/3  "></div>
            <div className="relative mx-auto">
              <div className="lg:max-w-2xl lg:mx-auto">
                <img
                  className="transform scale-110"
                  src={img1}
                  alt="Illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* our services */}
      <section class="py-12 bg-purple-100 sm:py-16 lg:py-20 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">Empower Your Team with Seamless Task Management</h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
              Manage tasks, track progress, and collaborate effortlessly to achieve your goals. Our platform helps streamline workflow, ensuring that you stay ahead and meet deadlines with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            <div className="md:p-8 lg:p-14">
              <svg className="mx-auto" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 29V23C45 10.85 35.15 1 23 1C10.85 1 1 10.85 1 23V29" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 29H1V41C1 43.209 2.791 45 5 45H13V29Z" fill="#D4D4D8" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M45 29H33V45H41C43.209 45 45 43.209 45 41V29Z" fill="#D4D4D8" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Task Tracking</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Stay on top of your projects by tracking tasks and their progress in real time. Our platform helps you prioritize and manage deadlines efficiently.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
              <svg className="mx-auto" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 27H19V45H27V27Z" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 37H1V45H9V37Z" fill="#D4D4D8" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M45 17H37V45H45V17Z" fill="#D4D4D8" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 17L15 7L23 15L37 1" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M28 1H37V10" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Collaboration</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Foster collaboration between team members with shared task views and communication tools. Keep everyone aligned and working towards the same goal.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
              <svg className="mx-auto" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M41 1H1V41H41V1Z" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18 7H7V20H18V7Z" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18 26H7V35H18V26Z" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M35 7H24V35H35V7Z" fill="#D4D4D8" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Task Assignment</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Easily assign tasks to team members and set deadlines to ensure accountability and transparency in project management.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
              <svg className="mx-auto" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.66667 25H6C3.23858 25 1 27.2386 1 30V37C1 39.7614 3.23858 42 6 42H36C38.7614 42 41 39.7614 41 37V30C41 27.2386 38.7614 25 36 25H31.8333C30.2685 25 29 26.2685 29 27.8333C29 29.3981 27.7315 30.6667 26.1667 30.6667H15.3333C13.7685 30.6667 12.5 29.3981 12.5 27.8333C12.5 26.2685 11.2315 25 9.66667 25Z"
                  fill="#D4D4D8"
                />
                <path d="M9 9H33" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 17H33" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1 25H13V31H29V25H41" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Reporting</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Get detailed insights into your team’s performance with task completion reports and progress tracking, making it easier to measure success.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
              <svg className="mx-auto" width="46" height="42" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30.562 18.4609C30.0511 17.9392 29.4292 17.5392 28.7426 17.2907C28.0559 17.0422 27.3221 16.9516 26.5956 17.0256C25.8692 17.0996 25.1687 17.3362 24.5462 17.718C23.9237 18.0998 23.3952 18.6169 23 19.2309C22.6049 18.6167 22.0764 18.0995 21.4539 17.7176C20.8315 17.3357 20.1309 17.099 19.4044 17.025C18.6779 16.951 17.944 17.0417 17.2573 17.2903C16.5706 17.5389 15.9488 17.939 15.438 18.4609C14.5163 19.4035 14.0002 20.6695 14.0002 21.9879C14.0002 23.3063 14.5163 24.5722 15.438 25.5149L23 33.1999L30.564 25.5159C31.485 24.5726 32.0004 23.3064 32 21.988C31.9997 20.6696 31.4835 19.4037 30.562 18.4609Z"
                  fill="#D4D4D8"
                  stroke="#161616"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M41 41H5C3.93913 41 2.92172 40.5786 2.17157 39.8284C1.42143 39.0783 1 38.0609 1 37V1H17L22 9H45V37C45 38.0609 44.5786 39.0783 43.8284 39.8284C43.0783 40.5786 42.0609 41 41 41Z"
                  stroke="#161616"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Efficiency</h3>
              <p className="mt-5 text-base text-gray-600 font-pj">
                Optimize your workflows with automated task prioritization, reminders, and collaboration tools to ensure maximum efficiency across your team.
              </p>
            </div>

            <div class="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
              <svg class="mx-auto" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 7C34.941 7 43 15.059 43 25C43 34.941 34.941 43 25 43C15.059 43 7 34.941 7 25" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 1C9.059 1 1 9.059 1 19H19V1Z" fill="#D4D4D8" stroke="#161616" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h3 class="mt-12 text-xl font-bold text-gray-900 font-pj">Achieve Your Goals</h3>
              <p class="mt-5 text-base text-gray-600 font-pj">Our platform is designed to deliver results. With powerful tools for task management, collaboration, and tracking, you can drive productivity and reach your objectives more effectively than ever before.</p>
            </div>

          </div>
        </div>
      </section>
      {/* our team */}
      <section class="py-12 bg-white sm:py-16 lg:py-20">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-purple-500 sm:text-4xl xl:text-5xl font-pj">Our Team</h2>
          </div>

          <div class="grid max-w-6xl grid-cols-5 px-4 mx-auto mt-12 text-center sm:px-0 gap-x-8 md:mt-20 gap-y-12">
            <div>
              <img class="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="https://i.pinimg.com/736x/bd/d9/aa/bdd9aaee8c129b1d0a7180512c6f7ae5.jpg" alt="" />
              <p class="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Mustafa Obiedat</p>
              <p class="mt-2 text-base font-normal text-gray-600 font-pj">Scrum Master</p>
            </div>

            <div>
              <img class="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="https://i.pinimg.com/736x/54/8a/65/548a659c2b06a877516d3c998f5b0939.jpg" alt="" />
              <p class="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Ghofran Hijazi</p>
              <p class="mt-2 text-base font-normal text-gray-600 font-pj">Product Owner</p>
            </div>

            <div>
              <img class="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="https://i.pinimg.com/736x/be/d9/ca/bed9ca19b3cc3fb6815a0b57753199d5.jpg" alt="" />
              <p class="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Hala Abu Sheihab</p>
              <p class="mt-2 text-base font-normal text-gray-600 font-pj">Developer</p>
            </div>

            <div>
              <img class="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="https://i.pinimg.com/736x/bd/42/8e/bd428e6bb156d90045700dbf3e967c3e.jpg" alt="" />
              <p class="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Ahamad Al-Jabareen</p>
              <p class="mt-2 text-base font-normal text-gray-600 font-pj">QA</p>
            </div>

            <div>
              <img class="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter" src="https://i.pinimg.com/736x/8e/e5/d8/8ee5d821350d03fffe88f97d55b92ed8.jpg" alt="" />
              <p class="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">Mhmed Al-Hmoud</p>
              <p class="mt-2 text-base font-normal text-gray-600 font-pj">Developer</p>
            </div>
          </div>

          <div class="mt-12 sm:mt-16">
            <svg class="w-auto h-4 mx-auto text-gray-300" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)" />
              <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)" />
            </svg>
          </div>

        </div>
      </section>


      {/* FQA */}

      <section class="py-10 bg-purple-100 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Find answers to common questions about managing tasks and using our platform efficiently.</p>
          </div>

          <div class="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            <div class="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
              <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                <span class="flex text-lg font-semibold text-black"> How do I create a new task? </span>

                <svg class="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div class="px-4 pb-5 sm:px-6 sm:pb-6">
                <p>To create a task, click on the Add Task button in the top-right corner of your dashboard. Fill in the task details, such as title, due date, and assignees, then click "Save" to add the task to your list.</p>
              </div>
            </div>

            <div class="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
              <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                <span class="flex text-lg font-semibold text-black"> How can I assign a task to a team member? </span>

                <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div class="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                <p>To assign a task, simply open the task details and select a team member from the "Assignee" dropdown. You can assign multiple members if needed. Once saved, the team member(s) will be notified.</p>
              </div>
            </div>

            <div class="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
              <div class="">
                <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                  <span class="flex text-lg font-semibold text-black"> Can I set task deadlines and reminders? </span>

                  <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div class="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                  <p>Yes, you can set a deadline for each task when creating or editing it. Additionally, you can enable reminders to notify team members about upcoming deadlines or overdue tasks.</p>
                </div>
              </div>
            </div>

            <div class="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
              <button type="button" class="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                <span class="flex text-lg font-semibold text-black"> How can I track task progress? </span>

                <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div class="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                <p>You can track task progress through the "Status" field. Tasks can be marked as "To Do," "In Progress," or "Completed." You can also view detailed task progress in the dashboard with visual charts and timelines.</p>
              </div>
            </div>
          </div>

          <p class="text-center text-gray-600 textbase mt-9">Didn't find the answer you are looking for? <a href="#" title="" class="font-medium text-purple-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Contact our support</a></p>
        </div>
      </section>

      {/* comments */}
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-600 font-pj">
                2,157 people have said how good Rareblocks
              </p>
              <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                Our happy clients say about us
              </h2>
            </div>
            <div className="mt-8 text-center md:mt-16 md:order-3">
              <a
                href="#"
                title=""
                className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
              >
                {" "}
                Check all 2,157 reviews{" "}
              </a>
            </div>
            <div className="relative mt-10 md:mt-24 md:order-2">
              <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                <div
                  className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                  style={{
                    background:
                      "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                  }}
                />
              </div>
              <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                <div className="flex flex-col overflow-hidden shadow-xl">
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                    <div className="flex-1">
                      <div className="flex items-center"></div>
                      <blockquote className="flex-1 mt-8">
                        <p className="text-lg leading-relaxed text-gray-900 font-pj">
                          “This service transformed my workflow. Everything is
                          organized and so easy to manage now. I can't imagine going
                          back!”
                        </p>
                      </blockquote>
                    </div>
                    <div className="flex items-center mt-8">
                      <img
                        className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                        src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                        alt=""
                      />
                      <div className="ml-4">
                        <p className="text-base font-bold text-gray-900 font-pj">
                          Leslie Alexander
                        </p>
                        <p className="mt-0.5 text-sm font-pj text-gray-600">
                          Freelance React Developer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden shadow-xl">
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                    <div className="flex-1">
                      <div className="flex items-center"></div>
                      <blockquote className="flex-1 mt-8">
                        <p className="text-lg leading-relaxed text-gray-900 font-pj">
                          “Absolutely brilliant! The platform is smooth, efficient,
                          and perfect for streamlining my business processes.”
                        </p>
                      </blockquote>
                    </div>
                    <div className="flex items-center mt-8">
                      <img
                        className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                        src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                        alt=""
                      />
                      <div className="ml-4">
                        <p className="text-base font-bold text-gray-900 font-pj">
                          Jacob Jones
                        </p>
                        <p className="mt-0.5 text-sm font-pj text-gray-600">
                          Digital Marketer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden shadow-xl">
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                    <div className="flex-1">
                      <div className="flex items-center"></div>
                      <blockquote className="flex-1 mt-8">
                        <p className="text-lg leading-relaxed text-gray-900 font-pj">
                          “My site’s performance has improved drastically. I can
                          easily make updates and track changes like never before!”
                        </p>
                      </blockquote>
                    </div>
                    <div className="flex items-center mt-8">
                      <img
                        className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                        src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
                        alt=""
                      />
                      <div className="ml-4">
                        <p className="text-base font-bold text-gray-900 font-pj">
                          Jenny Wilson
                        </p>
                        <p className="mt-0.5 text-sm font-pj text-gray-600">
                          Graphic Designer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





    </div>
  );
};

export default Home;