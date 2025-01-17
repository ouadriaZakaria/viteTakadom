import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseCard from "./components/CourseCard";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Enroll from "./components/Enroll";
import Profile from "./components/Profile";

// Sample course data
const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React and build your first app.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into advanced JavaScript concepts.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Tailwind CSS Crash Course",
    description: "Master Tailwind CSS and build responsive designs.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    title: "Node.js Essentials",
    description: "Learn how to build scalable backend applications with Node.js.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Explore data analysis and machine learning with Python.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 6,
    title: "Full-Stack Development",
    description: "Become a full-stack developer with MERN stack.",
    image: "https://via.placeholder.com/300",
  },
];

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="container mx-auto py-12">
                  <h2 className="text-3xl font-bold text-center mb-8">Popular Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                      <CourseCard
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.image}
                      />
                    ))}
                  </div>
                </div>
              </>
            }
          />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Signup Page */}
          <Route path="/signup" element={<Signup />} />

          {/* Enroll Page */}
          <Route path="/enroll/:courseId" element={<Enroll />} />

          {/* Profile Page */}
          <Route path="/profile" element={<Profile />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;