import PropTypes from "prop-types";
import { FileEdit, CircleDollarSign, UserCircle, BookOpen, Calendar, Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const CourseCard = ({ 
  course, 
  viewMode = "grid", 
  onEdit = () => {}, 
  onActionClick = () => {} 
}) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch teacher data when component mounts
    if (course.teacherId) {
      setLoading(true);
      axios.get(`/api/teachers/${course.teacherId}`)
        .then(response => {
          setTeacher(response.data);
        })
        .catch(error => {
          console.error("Error fetching teacher data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [course.teacherId]);

  const getActionButtonText = () => {
    return course.videos && course.videos.length > 0 ? "Continue Course" : "Start Course";
  };

  const getActionButtonStyle = () => {
    return "bg-blue-500 text-white hover:bg-blue-600";
  };

  // Get education level display text
  const getEducationLevel = () => {
    const levels = {
      PRIMARY: "Primary School",
      MIDDLE: "Middle School",
      HIGH: "High School",
      UNIVERSITY: "University",
      OTHER: "Other"
    };
    
    return levels[course.education] || course.education;
  };

  // Format publish date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${viewMode === 'grid' ? 'w-full' : 'flex'}`}>
      <div className={viewMode === 'grid' ? 'w-full aspect-video' : 'w-1/4'}>
        {/* Course thumbnail would come from videos[0] or a default image */}
        <img 
          src={course.videos && course.videos[0]?.url || "/default-course-image.jpg"} 
          alt={course.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
              {course.category}
            </span>
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {getEducationLevel()}
            </span>
          </div>
          <button 
            className="text-green-600 hover:text-green-800"
            onClick={() => onEdit(course)}
          >
            <FileEdit size={20} />
          </button>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">{course.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <CircleDollarSign size={16} className="mr-1" />
            <span>{course.price} Dinar</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            {course.privacy === 'private' ? (
              <Lock size={16} className="mr-1" />
            ) : (
              <Unlock size={16} className="mr-1" />
            )}
            <span className="capitalize">{course.privacy}</span>
          </div>
        </div>
        
        {teacher && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <UserCircle size={16} className="mr-1" />
            <span>{teacher.name}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Published: {formatDate(course.publishDate)}</span>
          </div>
          
          <div className="flex items-center">
            <BookOpen size={14} className="mr-1" />
            <span>{course.videos?.length || 0} videos</span>
          </div>
        </div>
        
        <button 
          className={`mt-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${getActionButtonStyle()}`}
          onClick={() => onActionClick(course)}
        >
          {getActionButtonText()}
        </button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.required,
    category: PropTypes.string.required,
    education: PropTypes.string.required,
    price: PropTypes.number.required,
    description: PropTypes.string,
    publishDate: PropTypes.string,
    privacy: PropTypes.string,
    teacherId: PropTypes.string.required,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.required,
        public_id: PropTypes.string.required,
      })
    ),
  }).isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"]),
  onEdit: PropTypes.func,
  onActionClick: PropTypes.func,
};

export default CourseCard;