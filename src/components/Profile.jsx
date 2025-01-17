import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Your Profile
          </h2>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h2 className="text-xl font-bold mt-4">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold">Enrolled Courses</h3>
            <ul className="mt-2">
              <li className="text-gray-600">React for Beginners</li>
              <li className="text-gray-600">Advanced JavaScript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;