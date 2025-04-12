
import PropTypes from 'prop-types';
import { X, Download, Book } from 'lucide-react'; // Import icons
import { useState } from 'react';

const CourseCard = ({ course, viewMode, onCardClick }) => {
  const isGridView = viewMode === 'grid';
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handler for card click
  const handleCardClick = () => {
    setIsModalOpen(true);
    if (onCardClick) onCardClick(course);
  };

  // Handler for closing the modal
  const handleCloseModal = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    setIsModalOpen(false);
  };

  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Regular Card Component */}
      <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${isGridView ? '' : 'flex'} hover:shadow-lg transition-shadow duration-200 cursor-pointer`}
        onClick={handleCardClick}
      >
        <div className={`${isGridView ? 'w-full' : 'w-48 flex-shrink-0'}`}>
          <img 
            src={course.thumbnail || "/api/placeholder/300/200"}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        </div>
        
        <div className={`p-5 ${isGridView ? '' : 'flex-1'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {course.categories?.[0] || 'Uncategorized'}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${course.privacy === 'public' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {course.privacy === 'public' ? 'Public' : 'Private'}
                </span>
              </div>
            </div>
            
            <div className="text-lg font-bold text-green-600">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          
          <div className="w-full max-w-48">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal View */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={handleModalContentClick}
          >
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={course.thumbnail || "/api/placeholder/1200/400"}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-3xl font-bold text-white">{course.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* Left Column - Course Details */}
              <div className="md:col-span-1">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">Price</h3>
                    <span className="text-xl font-bold text-green-600">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.categories?.map((category, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 py-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Course Details</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <span className="font-medium">Teacher ID:</span> {course.teacherId}
                    </li>
                    <li>
                      <span className="font-medium">Privacy:</span> {course.privacy}
                    </li>
                    <li>
                      <span className="font-medium">Created:</span> {course.createdAt || 'N/A'}
                    </li>
                    <li>
                      <span className="font-medium">Last Updated:</span> {course.updatedAt || 'N/A'}
                    </li>
                  </ul>
                </div>
                
                <div className="py-4">
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Book size={20} />
                    Continue Learning
                  </button>
                </div>
              </div>
              
              {/* Right Column - Description and PDF Viewer */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                
                {/* PDF Viewer */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                    <h4 className="font-medium">Course Material Preview</h4>
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                      <Download size={16} />
                      Download PDF
                    </button>
                  </div>
                  <div className="h-96 bg-gray-50 p-2">
                    {/* Simple PDF Viewer Placeholder */}
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded bg-white">
                      {course.pdfUrl ? (
                        <iframe
                          src={course.pdfUrl}
                          title="Course PDF"
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Book size={48} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500">PDF preview not available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    privacy: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    progress: PropTypes.number.isRequired,
    teacherId: PropTypes.number.isRequired,
    pdfUrl: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  viewMode: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
};

CourseCard.defaultProps = {
  viewMode: 'grid',
  onCardClick: null,
};

export default CourseCard;