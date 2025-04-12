import { useState, useEffect } from 'react';
import { CircleDollarSign, Book, Settings, LogOut, Search, Filter, Grid, List, ChevronDown, Edit, Save, X, Plus } from 'lucide-react';
import axios from "axios";
import PropTypes from 'prop-types';


const CourseCard = ({ course, viewMode, handleEditCourse, handleDeleteCourse }) => {
  const isGridView = viewMode === 'grid';
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${isGridView ? '' : 'flex'}`}>
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
          
          <div className="text-lg font-bold text-green-600">${course.price}</div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex justify-between items-center">
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
          
          <div className="flex ml-4 space-x-2">
            <button 
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              onClick={() => handleEditCourse(course)}
            >
              <Edit size={16} />
            </button>
            <button 
              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              onClick={() => handleDeleteCourse(course.id)}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
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
    id: PropTypes.number.isRequired,
  }).isRequired,
  viewMode: PropTypes.string.isRequired,
  handleEditCourse: PropTypes.func.isRequired,
  handleDeleteCourse: PropTypes.func.isRequired,
};

  



export default function TeacherProfile() {
  // Placeholder data for testing UI
  const placeholderTeacher = {
    id: 1,
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    role: "Professor",
    subject: "Computer Science",
    bio: "Professor with 15+ years of experience teaching programming and data structures. Research interests include AI and machine learning.",
    image: "/api/placeholder/200/200",
    joinDate: "Member since September 2022",
    totalPrice: 145,
    totalCourses: 8
  };
  
  const placeholderCourses = [
    { 
      id: 1, 
      title: "Introduction to React", 
      description: "Learn the basics of React development", 
      price: 32,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Web Development", "JavaScript"],
      progress: 100,
      education: "stage.UNIVERSITY",
      privacy: "public",
      videos: [
        { url: "https://example.com/video1.mp4", public_id: "video1" }
      ]
    },
    { 
      id: 2, 
      title: "Advanced JavaScript", 
      description: "Deep dive into JavaScript concepts", 
      price: 24,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Programming", "JavaScript"],
      progress: 75,
      education: "stage.UNIVERSITY",
      privacy: "public",
      videos: [
        { url: "https://example.com/video1.mp4", public_id: "video1" }
      ]
    },
    { 
      id: 3, 
      title: "Web Development Fundamentals", 
      description: "HTML, CSS and JavaScript basics", 
      price: 45,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Web Development", "Beginner"],
      progress: 100,
      education: "stage.HIGH",
      privacy: "public",
      videos: [
        { url: "https://example.com/video1.mp4", public_id: "video1" }
      ]
    },
    { 
      id: 4, 
      title: "Data Structures & Algorithms", 
      description: "Essential computer science concepts", 
      price: 28,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Computer Science", "Programming"],
      progress: 50,
      education: "stage.UNIVERSITY",
      privacy: "public",
      videos: [
        { url: "https://example.com/video1.mp4", public_id: "video1" }
      ]
    },
    { 
      id: 5, 
      title: "Database Systems", 
      description: "Introduction to database design and SQL", 
      price: 16,
      thumbnail: "/api/placeholder/300/200",
      categories: ["Database", "SQL"],
      progress: 0,
      education: "stage.UNIVERSITY",
      privacy: "private",
      videos: []
    }
  ];

  // Core state
  const [teacher, setTeacher] = useState(placeholderTeacher);
  const [courses, setCourses] = useState(placeholderCourses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usePlaceholders, setUsePlaceholders] = useState(false);
  
  // UI states
  const [activeTab, setActiveTab] = useState('profile');
  const [courseTab, setCourseTab] = useState('all');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const coursesPerPage = 6;
  
  // Temporary states for editing
  const [tempTeacher, setTempTeacher] = useState({...teacher});
  const [tempCourse, setTempCourse] = useState({
    id: null,
    title: "",
    description: "",
    price: 0,
    categories: [""],
    progress: 0,
    education: "stage.OTHER",
    privacy: "public",
    videos: []
  });

  // Fetch teacher data
  useEffect(() => {
    const getTeacherData = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await axios.get('/api/teachers/current');
          
          const teacherData = {
            id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role || "Teacher",
            subject: response.data.subject || response.data.category || "",
            bio: response.data.description || "",
            image: response.data.profileImage || "/api/placeholder/200/200",
            joinDate: `Member since ${new Date(response.data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
            totalPrice: response.data.totalEarnings || 0,
            totalCourses: response.data.coursesCount || 0
          };
          
          setTeacher(teacherData);
          setTempTeacher(teacherData);
          setUsePlaceholders(false);
        } catch (err) {
          console.warn("Using placeholder data for teacher:", err.message);
          setTeacher(placeholderTeacher);
          setTempTeacher(placeholderTeacher);
          setUsePlaceholders(true);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error in teacher data flow:", err);
        setError("Failed to load teacher profile");
        setLoading(false);
      }
    };
    
    getTeacherData();
  }, []);

  // Fetch courses
  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await axios.get('/api/courses/teacher');
          
          const coursesData = response.data.map(course => ({
            id: course._id,
            title: course.name,
            description: course.description,
            price: course.price,
            thumbnail: course.thumbnail || "/api/placeholder/300/200",
            categories: [course.category],
            progress: calculateProgress(course),
            education: course.education,
            privacy: course.privacy,
            publishDate: course.publishDate,
            videos: course.videos || []
          }));
          
          setCourses(coursesData);
          setUsePlaceholders(false);
        } catch (err) {
          console.warn("Using placeholder data for courses:", err.message);
          setCourses(placeholderCourses);
          setUsePlaceholders(true);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error in courses data flow:", err);
        setError("Failed to load courses");
        setLoading(false);
      }
    };
    
    getCourses();
  }, []);

  // Helper function to calculate course progress
  const calculateProgress = (course) => {
    if (!course.videos || course.videos.length === 0) return 0;
    if (course.status === "published") return 100;
    
    const completedVideos = course.videos.filter(video => 
      video.url && video.public_id && video.title
    ).length;
    
    return Math.round((completedVideos / course.videos.length) * 100);
  };
  
  // Filter and search courses
  const getFilteredCourses = () => {
    // First filter by tab selection
    const filtered = courses.filter(course => {
      switch(courseTab) {
        case 'all': 
          return true;
        case 'inProgress': 
          return course.progress > 0 && course.progress < 100;
        case 'completed': 
          return course.progress === 100;
        case 'draft': 
          return course.progress === 0;
        default: 
          return true;
      }
    });
    
    // Then apply search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return filtered.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }
    
    return filtered;
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
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [courseTab, searchQuery]);
  
  // Profile editing handlers
  const handleEditProfile = () => {
    setEditingProfile(true);
  };
  
  const handleSaveProfile = async () => {
    try {
      if (!usePlaceholders) {
        await axios.put('/api/teachers/current', {
          name: tempTeacher.name,
          email: tempTeacher.email,
          category: tempTeacher.subject,
          description: tempTeacher.bio
        });
      }
      
      setTeacher({...tempTeacher});
      setEditingProfile(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
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
      categories: [""],
      progress: 0,
      education: "stage.OTHER",
      privacy: "public",
      videos: []
    });
    setShowAddCourse(true);
  };
  
  const handleEditCourse = (course) => {
    setTempCourse({
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      categories: course.categories || [""],
      progress: course.progress || 0,
      education: course.education || "stage.OTHER",
      privacy: course.privacy || "public",
      videos: course.videos || []
    });
    setEditingCourse(course.id);
    setShowAddCourse(true);
  };

  const handleSaveCourse = async () => {
    try {
      if (editingCourse) {
        // Update existing course
        if (!usePlaceholders) {
          const response = await axios.put(`/api/courses/${editingCourse}`, {
            name: tempCourse.title,
            category: tempCourse.categories[0],
            education: tempCourse.education,
            price: tempCourse.price,
            description: tempCourse.description,
            privacy: tempCourse.privacy,
            videos: tempCourse.videos
          });
          
          if (response.status !== 200) {
            throw new Error("Failed to update course");
          }
        }
        
        // Update local state with the edited course
        setCourses(courses.map(c => c.id === editingCourse ? {
          ...c,
          title: tempCourse.title,
          description: tempCourse.description,
          price: tempCourse.price,
          categories: tempCourse.categories,
          education: tempCourse.education,
          privacy: tempCourse.privacy,
          progress: tempCourse.progress,
          videos: tempCourse.videos
        } : c));
      } else {
        // Add new course
        let newCourseId;
        let newCourseData;
        
        if (!usePlaceholders) {
          const response = await axios.post('/api/courses', {
            teacherId: teacher.id,
            name: tempCourse.title,
            category: tempCourse.categories[0],
            education: tempCourse.education,
            price: tempCourse.price,
            description: tempCourse.description,
            privacy: tempCourse.privacy,
            videos: tempCourse.videos
          });
          
          if (response.status !== 201) {
            throw new Error("Failed to create course");
          }
          
          newCourseId = response.data._id;
          newCourseData = response.data;
        } else {
          // Generate a fake ID for the placeholder flow
          newCourseId = Math.max(...courses.map(c => Number(c.id) || 0)) + 1;
        }
        
        // Add new course to local state
        const newCourse = {
          id: newCourseId,
          title: tempCourse.title,
          description: tempCourse.description,
          price: tempCourse.price,
          thumbnail: "/api/placeholder/300/200",
          categories: tempCourse.categories,
          progress: 0,
          education: tempCourse.education,
          privacy: tempCourse.privacy,
          videos: tempCourse.videos,
          publishDate: newCourseData?.publishDate || new Date().toISOString(),
        };
        
        // Update courses array
        setCourses([...courses, newCourse]);
        
        // Update teacher stats
        setTeacher({
          ...teacher,
          totalCourses: (teacher.totalCourses || 0) + 1,
          totalPrice: (teacher.totalPrice || 0) + Number(tempCourse.price || 0)
        });
      }
      
      // Reset state and close form
      setEditingCourse(null);
      setShowAddCourse(false);
      setTempCourse({
        id: null,
        title: "",
        description: "",
        price: 0,
        categories: [""],
        progress: 0,
        education: "stage.OTHER",
        privacy: "public",
        videos: []
      });
    } catch (err) {
      console.error("Error saving course:", err);
      alert(`Failed to ${editingCourse ? 'update' : 'create'} course: ${err.message}`);
    }
  };

  const handleCancelCourseEdit = () => {
    setTempCourse({
      id: null,
      title: "",
      description: "",
      price: 0,
      categories: [""],
      progress: 0,
      education: "stage.OTHER",
      privacy: "public",
      videos: []
    });
    
    setEditingCourse(null);
    setShowAddCourse(false);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    try {
      if (!usePlaceholders) {
        const response = await axios.delete(`/api/courses/${courseId}`);
        
        if (response.status !== 200) {
          throw new Error("Failed to delete course");
        }
      }
      
      // Find the course to calculate price adjustment
      const courseToDelete = courses.find(c => c.id === courseId);
      const priceAdjustment = courseToDelete?.price || 0;
      
      // Update local state by filtering out the deleted course
      setCourses(courses.filter(c => c.id !== courseId));
      
      // Update teacher stats
      setTeacher({
        ...teacher,
        totalCourses: Math.max(0, (teacher.totalCourses || 0) - 1),
        totalPrice: Math.max(0, (teacher.totalPrice || 0) - priceAdjustment)
      });
      
    } catch (err) {
      console.error("Error deleting course:", err);
      alert(`Failed to delete course: ${err.message}`);
    }
  };
  
  const handleCategoryChange = (e, index = 0) => {
    const categories = [...tempCourse.categories];
    categories[index] = e.target.value;
    setTempCourse({...tempCourse, categories});
  };
  
  const handleEducationChange = (e) => {
    setTempCourse({...tempCourse, education: e.target.value});
  };
  
  const handlePrivacyChange = (e) => {
    setTempCourse({...tempCourse, privacy: e.target.value});
  };
  
  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...tempCourse.videos];
    
    if (!updatedVideos[index]) {
      updatedVideos[index] = { url: "", public_id: "" };
    }
    
    updatedVideos[index][field] = value;
    setTempCourse({...tempCourse, videos: updatedVideos});
  };
  
  const addVideoField = () => {
    setTempCourse({
      ...tempCourse, 
      videos: [...tempCourse.videos, { url: "", public_id: "" }]
    });
  };
  
  const removeVideoField = (index) => {
    const updatedVideos = [...tempCourse.videos];
    updatedVideos.splice(index, 1);
    setTempCourse({...tempCourse, videos: updatedVideos});
  };
  
  // Pagination handlers
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={teacher.email?.split('@')[0] || "username"}
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Your username cannot be changed</p>
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

  // Course form content
  const renderCourseForm = () => (
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={tempCourse.price}
              onChange={(e) => setTempCourse({...tempCourse, price: Number(e.target.value)})}
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={tempCourse.categories[0]}
              onChange={(e) => handleCategoryChange(e)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={tempCourse.education}
              onChange={handleEducationChange}
            >
              <option value="stage.ELEMENTARY">Elementary School</option>
              <option value="stage.MIDDLE">Middle School</option>
              <option value="stage.HIGH">High School</option>
              <option value="stage.UNIVERSITY">University</option>
              <option value="stage.OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Privacy</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={tempCourse.privacy}
              onChange={handlePrivacyChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        
        {/* Video section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Videos</label>
          <div className="space-y-3">
            {tempCourse.videos.map((video, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Video URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={video.url || ""}
                  onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Video ID"
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={video.public_id || ""}
                  onChange={(e) => handleVideoChange(index, 'public_id', e.target.value)}
                />
                <button
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  onClick={() => removeVideoField(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
              onClick={addVideoField}
            >
              <Plus size={16} className="mr-1" /> Add Video
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            onClick={handleCancelCourseEdit}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            onClick={handleSaveCourse}
          >
            {editingCourse ? "Update Course" : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Settings size={16} className="mr-2" />
            Settings
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-red-600">
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs section */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('courses')}
          >
            My Courses
          </button>
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'earnings'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('earnings')}
          >
            Earnings
          </button>
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Profile image section */}
            <div className="md:w-1/3 bg-green-50 p-6 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={teacher.image || "/api/placeholder/200/200"}
                  alt={teacher.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
                {editingProfile && (
                  <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-lg">
                    <Edit size={16} />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center">
                {editingProfile ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center"
                    value={tempTeacher.name}
                    onChange={(e) => setTempTeacher({...tempTeacher, name: e.target.value})}
                  />
                ) : (
                  teacher.name
                )}
              </h2>
              <p className="text-gray-600 text-center">{teacher.role}</p>
              <p className="text-sm text-gray-500 text-center mt-1">{teacher.joinDate}</p>
              <div className="flex items-center mt-4 justify-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">${teacher.totalPrice || 0}</p>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{teacher.totalCourses || 0}</p>
                  <p className="text-sm text-gray-500">Courses</p>
                </div>
              </div>
            </div>
            
            {/* Profile details section */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile Details</h3>
                {editingProfile ? (
                  <div className="flex space-x-2">
                    <button
                      className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                      onClick={handleCancelProfileEdit}
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </button>
                    <button
                      className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      onClick={handleSaveProfile}
                    >
                      <Save size={16} className="mr-1" /> Save
                    </button>
                  </div>
                ) : (
                  <button
                    className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                    onClick={handleEditProfile}
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                  {editingProfile ? (
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={tempTeacher.email}
                      onChange={(e) => setTempTeacher({...tempTeacher, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{teacher.email}</p>
                  )}
                </div>
              
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Subject/Category</p>
                  {editingProfile ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={tempTeacher.subject}
                      onChange={(e) => setTempTeacher({...tempTeacher, subject: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{teacher.subject || 'Not specified'}</p>
                  )}
                </div>
              
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Bio</p>
                  {editingProfile ? (
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={4}
                      value={tempTeacher.bio}
                      onChange={(e) => setTempTeacher({...tempTeacher, bio: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900">{teacher.bio || 'No bio available'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <>
          {/* Course stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{courses.length}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-md">
                  <Book size={24} className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{inProgressCount}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-md">
                  <Edit size={24} className="text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{completedCount}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <Save size={24} className="text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Earnings</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">${teacher.totalPrice || 0}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <CircleDollarSign size={24} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Course form section */}
          {showAddCourse && renderCourseForm()}
          
          {/* Course filter tabs */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex space-x-1 border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className={`px-4 py-2 text-sm font-medium ${courseTab === 'all' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setCourseTab('all')}
                >
                  All ({courses.length})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${courseTab === 'inProgress' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setCourseTab('inProgress')}
                >
                  In Progress ({inProgressCount})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${courseTab === 'completed' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setCourseTab('completed')}
                >
                  Completed ({completedCount})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${courseTab === 'draft' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setCourseTab('draft')}
                >
                  Draft ({draftCount})
                </button>
              </div>
              
              <div className="flex space-x-3">
                <div className="relative w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <button
                    className={`p-2 border rounded-l-md ${viewMode === 'grid' ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 text-gray-700'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={`p-2 border rounded-r-md ${viewMode === 'list' ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 text-gray-700'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => setSortMenuOpen(!sortMenuOpen)}
                  >
                    <Filter size={16} className="mr-1" />
                    Sort
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  {sortMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Newest First
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Oldest First
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Price: High to Low
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Price: Low to High
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Alphabetical
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={handleAddCourse}
                >
                  <Plus size={16} className="mr-1" />
                  Add Course
                </button>
              </div>
            </div>
          </div>
          
          {/* Courses grid/list */}
          {currentCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Book size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? "No courses match your search criteria." 
                  : courseTab !== 'all' 
                    ? `You don't have any ${courseTab} courses yet.`
                    : "You haven't created any courses yet. Click the button below to get started."
                }
              </p>
              {!searchQuery && courseTab === 'all' && (
                <button
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={handleAddCourse}
                >
                  <Plus size={16} className="mr-1" />
                  Create Your First Course
                </button>
              )}
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {currentCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewMode={viewMode}
                  handleEditCourse={handleEditCourse}
                  handleDeleteCourse={handleDeleteCourse}
                />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {filteredCourses.length > coursesPerPage && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`px-3 py-1 border-t border-b ${
                      currentPage === index + 1
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {activeTab === 'earnings' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Earnings Overview</h2>
          
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${teacher.totalPrice || 0}</p>
              <p className="text-xs text-gray-500 mt-1">From {teacher.totalCourses || 0} courses</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">$0</p>
              <p className="text-xs text-gray-500 mt-1">From 0 sales</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <p className="text-sm font-medium text-gray-600">Pending Payout</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">$0</p>
              <p className="text-xs text-gray-500 mt-1">Available on MM/DD/YYYY</p>
            </div>
          </div>
          
          {/* Placeholder for chart */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 h-64 mb-8 flex items-center justify-center">
            <p className="text-gray-500">Earnings chart will appear here</p>
          </div>
          
          {/* Recent transactions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No transactions yet</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && renderSettingsTab()}
    </div>
  );
}

  

