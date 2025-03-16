import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const RoleSelection = ({ onSelectRole, isOpen, onClose }) => {
  const [hoverStudent, setHoverStudent] = useState(false);
  const [hoverTeacher, setHoverTeacher] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50"
    onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all"
      onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sélectionnez votre rôle</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6 my-8">
          {/* Student Option */}
          <button
            onClick={() => onSelectRole("student")}
            onMouseEnter={() => setHoverStudent(true)}
            onMouseLeave={() => setHoverStudent(false)}
            className="flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 transform"
            style={{
              background: hoverStudent 
                ? 'linear-gradient(45deg, #00c853, #64dd17)' 
                : 'white',
              border: '2px solid #e0e0e0',
              boxShadow: hoverStudent 
                ? '0 8px 16px rgba(0, 200, 83, 0.2)' 
                : '0 4px 6px rgba(0, 0, 0, 0.05)',
              transform: hoverStudent ? 'translateY(-4px)' : 'translateY(0)'
            }}
          >
            <div 
              className="rounded-full bg-gray-100 p-4 mb-4"
              style={{
                backgroundColor: hoverStudent ? 'rgba(255, 255, 255, 0.2)' : '#f5f5f5'
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="36" 
                height="36" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={hoverStudent ? "white" : "#00c853"}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M2 20v-8a2 2 0 0 1 2-2h3"></path>
                <path d="M12 4v4"></path>
                <path d="M10 4h4"></path>
                <path d="M18 10h3a2 2 0 0 1 2 2v8"></path>
                <path d="M5 13v-3a3 3 0 0 1 6 0v3"></path>
                <circle cx="15" cy="13" r="3"></circle>
                <path d="M8 19v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"></path>
              </svg>
            </div>
            <span className={`text-lg font-medium ${hoverStudent ? 'text-white' : 'text-gray-800'}`}>
              Étudiant
            </span>
            <span className={`text-sm mt-1 ${hoverStudent ? 'text-white text-opacity-90' : 'text-gray-500'}`}>
              Accédez à vos cours
            </span>
          </button>
          
          {/* Teacher Option */}
          <button
            onClick={() => onSelectRole("teacher")}
            onMouseEnter={() => setHoverTeacher(true)}
            onMouseLeave={() => setHoverTeacher(false)}
            className="flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 transform"
            style={{
              background: hoverTeacher 
                ? 'linear-gradient(45deg, #00c853, #64dd17)' 
                : 'white',
              border: '2px solid #e0e0e0',
              boxShadow: hoverTeacher 
                ? '0 8px 16px rgba(0, 200, 83, 0.2)' 
                : '0 4px 6px rgba(0, 0, 0, 0.05)',
              transform: hoverTeacher ? 'translateY(-4px)' : 'translateY(0)'
            }}
          >
            <div 
              className="rounded-full bg-gray-100 p-4 mb-4"
              style={{
                backgroundColor: hoverTeacher ? 'rgba(255, 255, 255, 0.2)' : '#f5f5f5'
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="36" 
                height="36" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={hoverTeacher ? "white" : "#00c853"}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m4 19 8-8"></path>
                <path d="m12 19-8-8"></path>
                <path d="M20 12h-4"></path>
                <path d="M20 16h-4"></path>
                <path d="M20 8h-4"></path>
                <path d="M16 4h4v16h-4"></path>
              </svg>
            </div>
            <span className={`text-lg font-medium ${hoverTeacher ? 'text-white' : 'text-gray-800'}`}>
              Enseignant
            </span>
            <span className={`text-sm mt-1 ${hoverTeacher ? 'text-white text-opacity-90' : 'text-gray-500'}`}>
              Gérez vos classes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

RoleSelection.propTypes = {
  onSelectRole: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RoleSelection;