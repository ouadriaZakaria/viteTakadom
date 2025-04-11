import React, { useState } from 'react';
import { User, Book, Bookmark, Settings, LogOut, Search, Filter, Grid, List, ChevronDown } from 'lucide-react';

const ProfileLibraryPage = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [viewMode, setViewMode] = useState('grid');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  
  // Sample user data
  const userData = {
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    role: "Étudiant",
    profileImage: "/api/placeholder/100/100",
    joinDate: "Membre depuis Septembre 2024",
    completedCourses: 8,
    inProgressCourses: 3
  };
  
  // Sample saved courses
  const savedCourses = [
    {
      id: 1,
      title: "Introduction à la Biologie Moléculaire",
      instructor: "Dr. Pierre Dubois",
      thumbnail: "/api/placeholder/300/200",
      categories: ["Science", "Biologie"],
      progress: 0,
      saved: true
    },
    {
      id: 2,
      title: "Mathématiques Avancées",
      instructor: "Prof. Marie Leclerc",
      thumbnail: "/api/placeholder/300/200",
      categories: ["Mathématiques", "Algèbre"],
      progress: 65,
      saved: true
    },
    {
      id: 3,
      title: "Histoire de l'Art Moderne",
      instructor: "Claire Fontaine",
      thumbnail: "/api/placeholder/300/200",
      categories: ["Art", "Histoire"],
      progress: 100,
      saved: true
    },
    {
      id: 4,
      title: "Programmation en Python",
      instructor: "Jean Lefebvre",
      thumbnail: "/api/placeholder/300/200",
      categories: ["Informatique", "Programmation"],
      progress: 25,
      saved: true
    },
    {
      id: 5,
      title: "Littérature Française du XIXe siècle",
      instructor: "Dr. Antoine Moreau",
      thumbnail: "/api/placeholder/300/200",
      categories: ["Littérature", "Français"],
      progress: 10,
      saved: true
    },
    {
      id: 6,
      title: "Introduction à l'Économie",
      instructor: "Prof. Sophie Bernard",
      thumbnail: "/api/placeholder/300/200",
      categories: ["Économie", "Sciences Sociales"],
      progress: 0,
      saved: true
    }
  ];
  
  // Sample completed courses
  const completedCourses = savedCourses.filter(course => course.progress === 100);
  
  // Sample in-progress courses
  const inProgressCourses = savedCourses.filter(course => course.progress > 0 && course.progress < 100);
  
  // Get courses based on active tab
  const getCoursesForTab = () => {
    switch (activeTab) {
      case 'saved': return savedCourses;
      case 'inProgress': return inProgressCourses;
      case 'completed': return completedCourses;
      default: return savedCourses;
    }
  };
  
  const courses = getCoursesForTab();
  
  // Course card component
  interface Course {
    id: number;
    title: string;
    instructor: string;
    thumbnail: string;
    categories: string[];
    progress: number;
    saved: boolean;
  }
  
  const CourseCard = ({ course }: { course: Course }) => (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${viewMode === 'grid' ? 'w-full' : 'flex'}`}>
      <div className={viewMode === 'grid' ? 'w-full aspect-video' : 'w-1/4'}>
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
      </div>
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex justify-between">
          <div className="flex space-x-2 mb-2">
            {course.categories.map((category, index) => (
              <span key={index} className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                {category}
              </span>
            ))}
          </div>
          <button className="text-green-600 hover:text-green-800">
            <Bookmark size={20} fill={course.saved ? "currentColor" : "none"} />
          </button>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
        
        {course.progress > 0 && (
          <div className="mt-2 mb-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">{course.progress}% Terminé</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <button 
          className={`mt-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            course.progress === 100 
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              : course.progress > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {course.progress === 100 ? 'Revoir' : course.progress > 0 ? 'Continuer' : 'Commencer'}
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mr-6 mb-4 md:mb-0">
              <img 
                src={userData.profileImage}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover border-4 border-green-100"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                  <p className="text-gray-600">{userData.email}</p>
                  <div className="flex items-center mt-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {userData.role}
                    </span>
                    <span className="text-gray-500 text-sm ml-3">{userData.joinDate}</span>
                  </div>
                </div>
                
                <div className="flex mt-4 md:mt-0 space-x-2">
                  <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors">
                    <Settings size={16} className="mr-1" />
                    <span>Paramètres</span>
                  </button>
                  <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors">
                    <LogOut size={16} className="mr-1" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-8 mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-900">{userData.completedCourses}</span>
                  <span className="text-sm text-gray-600">Cours terminés</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-900">{userData.inProgressCourses}</span>
                  <span className="text-sm text-gray-600">Cours en cours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-900">{savedCourses.length}</span>
                  <span className="text-sm text-gray-600">Cours sauvegardés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Library Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Ma Bibliothèque</h2>
          
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'saved' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark size={16} className="inline mr-1" />
              Sauvegardés ({savedCourses.length})
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'inProgress' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('inProgress')}
            >
              <Book size={16} className="inline mr-1" />
              En cours ({inProgressCourses.length})
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'completed' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('completed')}
            >
              <User size={16} className="inline mr-1" />
              Terminés ({completedCourses.length})
            </button>
          </div>
          
          {/* Filters and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
              <div className="relative mr-2 w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Rechercher des cours..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <Filter size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex border rounded-md mr-3">
                <button
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} className="text-gray-600" />
                </button>
                <button
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} className="text-gray-600" />
                </button>
              </div>
              
              <div className="relative">
                <button
                  className="flex items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                >
                  <span className="mr-1 text-sm">Trier par</span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>
                
                {sortMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Date (plus récent)</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Date (plus ancien)</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Nom (A-Z)</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Nom (Z-A)</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Progression</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Course Grid/List */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {courses.length > 0 ? (
              courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-3">
                  <Bookmark size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-700">Aucun cours trouvé</h3>
                <p className="text-gray-500 mt-2">
                  {activeTab === 'saved' && "Vous n'avez pas encore sauvegardé de cours."}
                  {activeTab === 'inProgress' && "Vous n'avez pas de cours en cours."}
                  {activeTab === 'completed' && "Vous n'avez pas encore terminé de cours."}
                </p>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">

                 Explorer les cours
                </button>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {courses.length > 0 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center">
                <button className="px-3 py-1 border rounded-l-md hover:bg-gray-50">Précédent</button>
                <button className="px-3 py-1 border-t border-b bg-green-500 text-white">1</button>
                <button className="px-3 py-1 border-t border-b hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border-t border-b hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded-r-md hover:bg-gray-50">Suivant</button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLibraryPage;