import React from "react";
import { motion } from "framer-motion";
import { Clock, Star, BookOpen } from "lucide-react";

import PropTypes from "prop-types";

const CourseCard = ({
  title,
  description,
  image,
  price = 0,
  duration = "N/A",
  rating = null,
  tags = [],
  isFeatured = false,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300"
    >
      {/* Badge for Featured Courses */}
      {isFeatured && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded-full">
          Featured
        </div>
      )}

      {/* Course Image */}
      <div className="relative h-48">
        <img
          src={image || "/api/placeholder/400/200"}
          alt={title}
          className="w-full h-full object-cover"
        />
        {price === 0 ? (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Free
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            ${price}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title and Description */}
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        {/* Additional Details */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
          {/* Duration */}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        {/* Enroll Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Enroll Now</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  duration: PropTypes.string,
  instructor: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    avatar: PropTypes.string,
  }),
  rating: PropTypes.number,
  studentsCount: PropTypes.number,
  progress: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  isFeatured: PropTypes.bool,
};

CourseCard.defaultProps = {
  description: "No description available.",
  image: "/api/placeholder/400/200",
  price: 0,
  duration: "N/A",
  instructor: null,
  rating: null,
  studentsCount: 0,
  progress: 0,
  tags: [],
  isFeatured: false,
};

export default CourseCard;
