import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import "./index.css";
import PropTypes from "prop-types";
import axios from "axios"; // Import axios
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";
import RoleSelection from "./components/RoleSelection";
import AuthPage from "./components/Authentification";
import MultiLevelNavMenu from "./components/NavBar"; 

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  
  // State for course data with loading and error states
  const [primaireCourses, setPrimaireCourses] = useState([]);
  const [moyenCourses, setMoyenCourses] = useState([]);
  const [secondaireCourses, setSecondaireCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Education levels data structure for the MultiLevelNavMenu
  const educationLevels = [
    {
      id: "primaire",
      name: "Primaire",
      path: "primaire",
      years: [
        {
          id: 1,
          name: "1ère Année",
          modules: [
            { id: "math-p1", name: "Mathématiques" },
            { id: "francais-p1", name: "Français" },
            { id: "science-p1", name: "Sciences" }
          ]
        },
        {
          id: 2,
          name: "2ème Année",
          modules: [
            { id: "math-p2", name: "Mathématiques" },
            { id: "francais-p2", name: "Français" },
            { id: "science-p2", name: "Sciences" }
          ]
        },
        {
          id: 3,
          name: "3ème Année",
          modules: [
            { id: "math-p3", name: "Mathématiques" },
            { id: "francais-p3", name: "Français" },
            { id: "science-p3", name: "Sciences" }
          ]
        }
      ]
    },
    {
      id: "moyen",
      name: "Moyen",
      path: "moyen",
      years: [
        {
          id: 1,
          name: "1ère Année",
          modules: [
            { id: "math-m1", name: "Mathématiques" },
            { id: "physique-m1", name: "Physique" },
            { id: "francais-m1", name: "Français" },
            { id: "histoire-m1", name: "Histoire" }
          ]
        },
        {
          id: 2,
          name: "2ème Année",
          modules: [
            { id: "math-m2", name: "Mathématiques" },
            { id: "physique-m2", name: "Physique" },
            { id: "francais-m2", name: "Français" },
            { id: "histoire-m2", name: "Histoire" }
          ]
        },
        {
          id: 3,
          name: "3ème Année",
          modules: [
            { id: "math-m3", name: "Mathématiques" },
            { id: "physique-m3", name: "Physique" },
            { id: "francais-m3", name: "Français" },
            { id: "histoire-m3", name: "Histoire" }
          ]
        }
      ]
    },
    {
      id: "secondaire",
      name: "Secondaire",
      path: "secondaire",
      years: [
        {
          id: 1,
          name: "1ère Année",
          modules: [
            { id: "math-s1", name: "Mathématiques" },
            { id: "physique-s1", name: "Physique" },
            { id: "chimie-s1", name: "Chimie" },
            { id: "francais-s1", name: "Français" },
            { id: "philosophie-s1", name: "Philosophie" }
          ]
        },
        {
          id: 2,
          name: "2ème Année",
          modules: [
            { id: "math-s2", name: "Mathématiques" },
            { id: "physique-s2", name: "Physique" },
            { id: "chimie-s2", name: "Chimie" },
            { id: "francais-s2", name: "Français" },
            { id: "philosophie-s2", name: "Philosophie" }
          ]
        },
        {
          id: 3,
          name: "3ème Année",
          modules: [
            { id: "math-s3", name: "Mathématiques" },
            { id: "physique-s3", name: "Physique" },
            { id: "chimie-s3", name: "Chimie" },
            { id: "francais-s3", name: "Français" },
            { id: "philosophie-s3", name: "Philosophie" }
          ]
        }
      ]
    }
  ];

  // Placeholder course data with teacherId instead of id
  const primairePlaceholders = [
    {
      teacherId: 1,
      title: "Mathématiques de Base",
      description: "Apprenez les bases de l'addition, de la soustraction et de la multiplication.",
      thumbnail: "https://images.unsplash.com/photo-1582719464441-b4b18029c4e0",
      price: 0, // Free course
      privacy: "public",
      categories: ["Mathématiques", "Primaire"],
      progress: 0,
    },
    {
      teacherId: 2,
      title: "Langue Française : Lecture et Écriture",
      description: "Maîtrisez la lecture et l'écriture en français avec des activités amusantes.",
      thumbnail: "https://images.unsplash.com/photo-1587524574298-7a7322d300b9",
      price: 0,
      privacy: "public",
      categories: ["Français", "Primaire"],
      progress: 0,
    },
  ];
  
  const moyenPlaceholders = [
    {
      teacherId: 3,
      title: "Mathématiques : Fractions et Pourcentages",
      description: "Comprenez les fractions, les pourcentages et leurs applications.",
      thumbnail: "https://images.unsplash.com/photo-1582719464441-b4b18029c4e0",
      price: 0,
      privacy: "public",
      categories: ["Mathématiques", "Moyen"],
      progress: 0,
    },
    {
      teacherId: 4,
      title: "Sciences Naturelles",
      description: "Découvrez les bases de la biologie, la physique et la chimie.",
      thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
      price: 0,
      privacy: "public",
      categories: ["Sciences", "Moyen"],
      progress: 0,
    },
  ];
  
  const secondairePlaceholders = [
    {
      teacherId: 5,
      title: "Mathématiques : Algèbre et Géométrie",
      description: "Maîtrisez les équations, les fonctions et les figures géométriques complexes.",
      thumbnail: "https://images.unsplash.com/photo-1582719464441-b4b18029c4e0",
      price: 0,
      privacy: "public",
      categories: ["Mathématiques", "Secondaire"],
      progress: 0,
    },
    {
      teacherId: 6,
      title: "Physique Avancée",
      description: "Étudiez la mécanique, l'électricité et la thermodynamique.",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa",
      price: 0,
      privacy: "public",
      categories: ["Physique", "Secondaire"],
      progress: 0,
    },
  ];

  // Combine all placeholders
  const allPlaceholders = [
    ...primairePlaceholders,
    ...moyenPlaceholders,
    ...secondairePlaceholders,
  ];

  // Function to shuffle the array and pick a subset of courses
  const getRandomCourses = (courses, count) => {
    const shuffled = [...courses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  // Fetch course data from API
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Fetch all courses from different endpoints
        const [primaireRes, moyenRes, secondaireRes] = await Promise.all([
          axios.get('https://your-api-endpoint.com/courses/primaire'),
          axios.get('https://your-api-endpoint.com/courses/moyen'),
          axios.get('https://your-api-endpoint.com/courses/secondaire')
        ]);

        // Set course data from API responses
        setPrimaireCourses(primaireRes.data);
        setMoyenCourses(moyenRes.data);
        setSecondaireCourses(secondaireRes.data);

        // Combine all courses for popular and featured sections
        const allApiCourses = [
          ...primaireRes.data,
          ...moyenRes.data,
          ...secondaireRes.data
        ];

        // Set popular and featured courses
        setPopularCourses(getRandomCourses(allApiCourses, 6));
        setFeaturedCourses(getRandomCourses(allApiCourses, 3));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Showing placeholder data instead.');
        
        // Use placeholder data as fallback
        setPrimaireCourses(primairePlaceholders);
        setMoyenCourses(moyenPlaceholders);
        setSecondaireCourses(secondairePlaceholders);
        
        // Set popular and featured courses from placeholders
        setPopularCourses(getRandomCourses(allPlaceholders, 6));
        setFeaturedCourses(getRandomCourses(allPlaceholders, 3));
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize with placeholder data
    setPrimaireCourses(primairePlaceholders);
    setMoyenCourses(moyenPlaceholders);
    setSecondaireCourses(secondairePlaceholders);
    setPopularCourses(getRandomCourses(allPlaceholders, 6));
    setFeaturedCourses(getRandomCourses(allPlaceholders, 3));
    
    // Then fetch actual data
    fetchCourses();
  }, []);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setIsRoleModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleAuthSubmit = ({ email, password, role }) => {
    console.log('Login attempt:', { email, password, role });
    // Here you would typically:
    // 1. Call your authentication API
    // 2. Handle loading state
    // 3. Handle success/error responses
    // 4. Redirect or update UI based on authentication result
    setIsAuthModalOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleCourseClick = (course) => {
    console.log("Course clicked:", course);
    // Here you would navigate to course details page
    // navigate(`/course/${course.teacherId}`);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Hero Section with Background Image */}
        <div 
          className="bg-fixed bg-cover bg-center" 
          style={{ backgroundImage: "url('./assets/amphitheater.jpg')" }}
        >
          {/* Navigation Bar */}
          <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-green-600">
                  EduPlatform
                </Link>
              </div>

              {/*  Multi-Level Navigation Menu */}
              <div className="flex-grow flex justify-center">
                <MultiLevelNavMenu educationLevels={educationLevels} />
              </div>

              {/* Right Side - Search & Login */}
              <div className="flex items-center gap-4">
                <SearchBar
                  placeholder="Rechercher des cours..."
                  onSearch={handleSearch}
                  className="w-64"
                />
                
                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                  Connexion
                </button>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <div className="w-full py-32 text-white">
            <div className="container mx-auto text-center px-4">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600">
                Bienvenue sur notre plateforme d'apprentissage
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 mx-auto max-w-3xl">
                Explorez des cours sur mesure pour vous aider à exceller dans vos
                compétences et accomplir vos objectifs. Embarquez pour un voyage
                d'apprentissage inoubliable.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="#courses"
                  className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  Découvrir nos cours
                </a>
                <a
                  href="#featured"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300"
                >
                  Cours recommandés
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow">
          {/* Display error message if any */}
          {error && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 container mx-auto mt-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          {/* Featured Courses Section */}
          <section id="featured" className="py-16 bg-gradient-to-br from-teal-500 to-emerald-600">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Cours en Vedette</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-white text-green-600" : "bg-transparent text-white"}`}
                  >
                    Grille
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-white text-green-600" : "bg-transparent text-white"}`}
                  >
                    Liste
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                </div>
              ) : (
                <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"} gap-6`}>
                  {featuredCourses.map((course) => (
                    <CourseCard
                      key={course.teacherId}
                      course={course}
                      viewMode={viewMode}
                      onCardClick={handleCourseClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Popular Courses Section */}
          <section id="courses" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Cours Populaires</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    Grille
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    Liste
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-700"></div>
                </div>
              ) : (
                <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
                  {popularCourses.map((course) => (
                    <CourseCard
                      key={course.teacherId}
                      course={course}
                      viewMode={viewMode}
                      onCardClick={handleCourseClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Education Levels Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Parcours Éducatifs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Primaire */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:translate-y-[-5px]">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Niveau Primaire</h3>
                  <p className="text-gray-600 mb-6">
                    Des cours adaptés aux élèves du primaire couvrant les mathématiques de base, la lecture, 
                    l'écriture et les sciences.
                  </p>
                  <Link to="/primaire" className="text-green-500 font-medium hover:text-green-700 transition-colors">
                    Explorer les cours →
                  </Link>
                </div>

                {/* Moyen */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:translate-y-[-5px]">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Niveau Moyen</h3>
                  <p className="text-gray-600 mb-6">
                    Programmes conçus pour les collégiens avec des cours avancés en mathématiques, 
                    sciences, langues et histoire.
                  </p>
                  <Link to="/moyen" className="text-green-500 font-medium hover:text-green-700 transition-colors">
                    Explorer les cours →
                  </Link>
                </div>

                {/* Secondaire */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-transform hover:translate-y-[-5px]">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Niveau Secondaire</h3>
                  <p className="text-gray-600 mb-6">
                    Préparation au baccalauréat avec des cours spécialisés pour toutes les filières 
                    scientifiques et littéraires.
                  </p>
                  <Link to="/secondaire" className="text-green-500 font-medium hover:text-green-700 transition-colors">
                    Explorer les cours →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Modals */}
      <RoleSelection
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelectRole={handleSelectRole}
      />

      {selectedRole && (
        <AuthPage
          role={selectedRole}
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onBack={() => {
            setIsAuthModalOpen(false);
            setIsRoleModalOpen(true);
          }}
          onSubmit={handleAuthSubmit}
        />
      )}
    </Router>
  );
};

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default App;