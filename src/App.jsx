import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import SignupForm from "./pages/Register";
import Home from "./pages/Home"
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import TasksManagment from "./pages/TasksManagment";
import TasksCard from "./pages/TasksCard";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import Article from "./pages/Article";
import ArticleDetails from "./pages/ArticleDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import { Home } from "lucide-react";

function App() {
  const location = useLocation(); // معرفة الصفحة الحالية
  const hideNavbarPages = ["/", "/dashboard", "/Home","/Register"]; // الصفحات التي لن يظهر فيها Navbar
  const hideFooterPages = [ "/dashboard","/Register"]; // الصفحات التي لن يظهر فيها Footer
  
  return (
    <div>
      {/* عرض Navbar فقط في الصفحات التي ليست في hideNavbarPages */}
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/tasks/create" element={<TasksManagment/>} />
        <Route path="/tasks" element={<TasksCard/>} />
        <Route path="/task/:id" element={<TaskDetails/>} />
        <Route path="/edit-task/:id" element={<EditTask/>} />
        <Route path="/Article" element={<Article/>}/>
        <Route path="/Blog/:id" element={<ArticleDetails/>} />
        <Route path="/About" element={<AboutUs/>}/>
        <Route path="/Contact" element={<ContactUs/>}/>
      </Routes>

      {/* عرض Footer فقط في الصفحات التي ليست في hideFooterPages */}
      {!hideFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
