import { useState, useEffect } from 'react';
import { CircleDollarSign, Book, Settings, LogOut, Search, Filter, Grid, List, ChevronDown, Edit, Save, X, Plus } from 'lucide-react';
import CourseCard from '../components/CourseCard';

 



export default function TeacherProfile() {
  // Sample initial teacher data
  const [teacher, setTeacher] = useState({
    id: 1,
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    role: "Professor",
    subject: "Computer Science",
    bio: "Professor with 15+ years of experience teaching programming and data structures. Research interests include AI and machine learning.",
    image: "/api/placeholder/200/200",
    joinDate: "Member since September 2022",
    totalprice: 145,
    totalCourses: 8
  });
  
  // Sample courses data
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: "Introduction to React", 
      description: "Learn the basics of React development", 
      price: 32,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Web Development", "JavaScript"],
      progress: 100
    },
    { 
      id: 2, 
      title: "Advanced JavaScript", 
      description: "Deep dive into JavaScript concepts", 
      price: 24,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Programming", "JavaScript"],
      progress: 75
    },
    { 
      id: 3, 
      title: "Web Development Fundamentals", 
      description: "HTML, CSS and JavaScript basics", 
      price: 45,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Web Development", "Beginner"],
      progress: 100
    },
    { 
      id: 4, 
      title: "Data Structures & Algorithms", 
      description: "Essential computer science concepts", 
      price: 28,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Computer Science", "Programming"],
      progress: 50
    },
    { 
      id: 5, 
      title: "Database Systems", 
      description: "Introduction to database design and SQL", 
      price: 16,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Database", "SQL"],
      progress: 0
    }
  ]);
  
  // UI states
  const [activeTab, setActiveTab] = useState('profile');
  const [courseTab, setCourseTab] = useState('all');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  
  // Temporary states for editing
  const [tempTeacher, setTempTeacher] = useState({...teacher});
  const [tempCourse, setTempCourse] = useState({
    id: null,
    title: "",
    description: "",
    price: 0,
    categories: [],
    thumbnail: "/api/placeholder/300/200",
    progress: 0
  });
  
  // Filter courses based on the selected tab
  const getFilteredCourses = () => {
    switch(courseTab) {
      case 'all': 
        return courses;
      case 'inProgress': 
        return courses.filter(course => course.progress > 0 && course.progress < 100);
      case 'completed': 
        return courses.filter(course => course.progress === 100);
      case 'draft': 
        return courses.filter(course => course.progress === 0);
      default: 
        return courses;
    }
  };
  
  const filteredCourses = getFilteredCourses();
  const inProgressCount = courses.filter(course => course.progress > 0 && course.progress < 100).length;
  const completedCount = courses.filter(course => course.progress === 100).length;
  const draftCount = courses.filter(course => course.progress === 0).length;
  
  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  
  // Update temp teacher when main teacher changes
  useEffect(() => {
    setTempTeacher({...teacher});
  }, [teacher]);
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [courseTab]);
  
  // Profile editing handlers
  const handleEditProfile = () => {
    setEditingProfile(true);
  };
  
  const handleSaveProfile = () => {
    setTeacher({...tempTeacher});
    setEditingProfile(false);
  };
  
  const handleCancelProfileEdit = () => {
    setTempTeacher({...teacher});
    setEditingProfile(false);
  };
  
  // Course handlers
  const handleAddCourse = () => {
    setTempCourse({
      id: null,
      title: "",
      description: "",
      price: 0,
      categories: [],
      thumbnail: "/api/placeholder/300/200",
      progress: 0
    });
    setShowAddCourse(true);
  };
  
  const handleEditCourse = (course) => {
    setTempCourse({...course});
    setEditingCourse(course.id);
  };
  
  const handleSaveCourse = () => {
    if (editingCourse) {
      // Update existing course
      setCourses(courses.map(c => c.id === editingCourse ? {...tempCourse, id: editingCourse} : c));
      setEditingCourse(null);
    } else {
      // Add new course
      const newCourse = {
        ...tempCourse,
        id: Math.max(0, ...courses.map(c => c.id)) + 1
      };
      setCourses([...courses, newCourse]);
      setShowAddCourse(false);
    }
  };
  
  const handleCancelCourseEdit = () => {
    setEditingCourse(null);
    setShowAddCourse(false);
  };
  
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value.trim()) {
      const categories = value.split(',').map(cat => cat.trim());
      setTempCourse({...tempCourse, categories});
    } else {
      setTempCourse({...tempCourse, categories: []});
    }
  };
  
  // Pagination handlers
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // Settings tab content
  const renderSettingsTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
      
      <div className="space-y-8">
        {/* Account Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CircleDollarSignname</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value="jsmith22"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Your CircleDollarSignname cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                Update your password
              </button>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Email notifications</p>
                <p className="text-xs text-gray-500">Receive emails about course enrollments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Student message alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Course update reminders</p>
                <p className="text-xs text-gray-500">Reminders to update your course content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Profile visibility</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Course statistics sharing</p>
                <p className="text-xs text-gray-500">Share anonymized course statistics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Danger Zone */}
        <div className="border border-red-200 rounded-md p-4 bg-red-50">
          <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700 mb-2">Delete Account</p>
              <p className="text-xs text-gray-500 mb-3">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Course card component


 

 

  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mr-6 mb-4 md:mb-0">
              <img 
                src={teacher.image}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover border-4 border-green-100"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{teacher.name}</h1>
                  <p className="text-gray-600">{teacher.email}</p>
                  <div className="flex items-center mt-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {teacher.role}
                    </span>
                    <span className="text-gray-500 text-sm ml-3">{teacher.joinDate}</span>
                  </div>
                </div>
                
                <div className="flex mt-4 md:mt-0 space-x-2">
                  {!editingProfile ? (
                    <button 
                      className="flex items-center px-3 py-2 bg-green-100 rounded-md text-green-700 hover:bg-green-200 transition-colors"
                      onClick={handleEditProfile}
                    >
                      <Edit size={16} className="mr-1" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <>
                      <button 
                        className="flex items-center px-3 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition-colors"
                        onClick={handleSaveProfile}
                      >
                        <Save size={16} className="mr-1" />
                        <span>Save</span>
                      </button>
                      <button 
                        className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                        onClick={handleCancelProfileEdit}
                      >
                        <X size={16} className="mr-1" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-8 mt-6">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-900">{teacher.totalCourses}</span>
                  <span className="text-sm text-gray-600">Courses</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-green-600">{completedCount}</span>
                  <span className="text-sm text-gray-600">Published</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav>
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-md font-medium ${activeTab === 'profile' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <CircleDollarSign size={18} className="mr-3" />
                  <span>Profile</span>
                </button>
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-md font-medium ${activeTab === 'courses' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('courses')}
                >
                  <Book size={18} className="mr-3" />
                  <span>My Courses</span>
                </button>
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-md font-medium ${activeTab === 'settings' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className="mr-3" />
                  <span>Settings</span>
                </button>
                <button
                  className="flex items-center w-full px-4 py-3 rounded-md font-medium text-gray-600 hover:bg-gray-50"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Log Out</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Teacher Profile</h2>
                
                {!editingProfile ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                      <p className="text-gray-900">{teacher.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                      <p className="text-gray-900">{teacher.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Subject Area</h3>
                      <p className="text-gray-900">{teacher.subject}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Biography</h3>
                      <p className="text-gray-900">{teacher.bio}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={tempTeacher.name}
                        onChange={(e) => setTempTeacher({...tempTeacher, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={tempTeacher.email}
                        onChange={(e) => setTempTeacher({...tempTeacher, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject Area</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={tempTeacher.subject}
                        onChange={(e) => setTempTeacher({...tempTeacher, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows={4}
                        value={tempTeacher.bio}
                        onChange={(e) => setTempTeacher({...tempTeacher, bio: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Courses Section */}
            {activeTab === 'courses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                  {!showAddCourse && (
                    <button 
                      className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      onClick={handleAddCourse}
                    >
                      <Plus size={16} />
                      <span>Create Course</span>
                    </button>
                  )}
                </div>
                
                {/* Add/Edit Course Form */}
                {(showAddCourse || editingCourse) && (
                  <div className="bg-gray-50 p-6 mb-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium mb-4">
                      {editingCourse ? "Edit Course" : "Create New Course"}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          value={tempCourse.title}
                          onChange={(e) => setTempCourse({...tempCourse, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          rows={3}
                          value={tempCourse.description}
                          onChange={(e) => setTempCourse({...tempCourse, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dinar</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            value={tempCourse.price}
                            onChange={(e) => setTempCourse({...tempCourse, price: parseInt(e.target.value) || 0})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Completion Status (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            value={tempCourse.progress}
                            onChange={(e) => setTempCourse({...tempCourse, progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categories (comma separated)</label>
                        <input
                          type="text"
                          // Continuing from the previous code...
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          value={tempCourse.categories.join(', ')}
                          onChange={handleCategoryChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-6 gap-2">
                      <button 
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={handleCancelCourseEdit}
                      >
                        Cancel
                      </button>
                      <button 
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={handleSaveCourse}
                      >
                        {editingCourse ? "Update Course" : "Create Course"}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Course Tabs */}
                <div className="mb-6 border-b border-gray-200">
                  <nav className="flex space-x-8">
                    <button
                      className={`pb-4 px-1 ${courseTab === 'all' ? 'border-b-2 border-green-500 text-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setCourseTab('all')}
                    >
                      All ({courses.length})
                    </button>
                    <button
                      className={`pb-4 px-1 ${courseTab === 'inProgress' ? 'border-b-2 border-green-500 text-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setCourseTab('inProgress')}
                    >
                      In Progress ({inProgressCount})
                    </button>
                    <button
                      className={`pb-4 px-1 ${courseTab === 'completed' ? 'border-b-2 border-green-500 text-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setCourseTab('completed')}
                    >
                      Published ({completedCount})
                    </button>
                    <button
                      className={`pb-4 px-1 ${courseTab === 'draft' ? 'border-b-2 border-green-500 text-green-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setCourseTab('draft')}
                    >
                      Drafts ({draftCount})
                    </button>
                  </nav>
                </div>
                
                {/* Course List Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="relative">
                      <button 
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => setSortMenuOpen(!sortMenuOpen)}
                      >
                        <Filter size={16} className="mr-2" />
                        <span>Sort</span>
                        <ChevronDown size={16} className="ml-2" />
                      </button>
                      {sortMenuOpen && (
                        <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Newest First
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Oldest First
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Title (A-Z)
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Price (Low to High)
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Price (High to Low)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={20} />
                    </button>
                    <button 
                      className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                  <>
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                      {currentCourses.map(course => (
                        <CourseCard key={course.id} course={course} viewMode={viewMode} handleEditCourse={handleEditCourse} />
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <nav className="flex items-center">
                          <button 
                            className="px-3 py-1 rounded-md mr-2 bg-gray-100 text-gray-700 disabled:opacity-50"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button 
                              key={page}
                              className={`w-8 h-8 mx-1 rounded-full ${currentPage === page ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                              onClick={() => goToPage(page)}
                            >
                              {page}
                            </button>
                          ))}
                          
                          <button 
                            className="px-3 py-1 rounded-md ml-2 bg-gray-100 text-gray-700 disabled:opacity-50"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Book size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-6">There are no courses matching your current filters.</p>
                    <button 
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => setCourseTab('all')}
                    >
                      View All Courses
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Settings Section */}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </div>
    </div>
  );
}