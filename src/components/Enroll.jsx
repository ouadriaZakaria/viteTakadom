import React from "react";
import { useParams } from "react-router-dom";

const Enroll = () => {
  const { courseId } = useParams();

  // Fetch course details based on courseId (you can replace this with an API call)
  const course = {
    id: courseId,
    title: "React for Beginners",
    description: "Learn the basics of React and build your first app.",
    image: "https://via.placeholder.com/300",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enroll in {course.title}
          </h2>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Confirm Enrollment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;