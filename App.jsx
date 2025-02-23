import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { NavigationMenu } from "radix-ui";
import classNames from "classnames";
import { CaretDownIcon, PersonIcon } from "@radix-ui/react-icons";
import "./index.css";
import PropTypes from "prop-types";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const primaireCourses = [
    {
      id: 1,
      title: "Mathématiques de Base",
      description:
        "Apprenez les bases de l'addition, de la soustraction et de la multiplication.",
      image: "https://images.unsplash.com/photo-1582719464441-b4b18029c4e0",
    },
    {
      id: 2,
      title: "Langue Française : Lecture et Écriture",
      description:
        "Maîtrisez la lecture et l'écriture en français avec des activités amusantes.",
      image: "https://images.unsplash.com/photo-1587524574298-7a7322d300b9", // Image lecture
    },
  ];
  
  const moyenCourses = [
    {
      id: 3,
      title: "Mathématiques : Fractions et Pourcentages",
      description:
        "Comprenez les fractions, les pourcentages et leurs applications.",
      image: "https://images.unsplash.com/photo-1582719464441-b4b18029c4e0", // Image fractions
    },
  ];
  
  const secondaireCourses = [
    {
      id: 4,
      title: "Mathématiques : Algèbre et Géométrie",
      description:
        "Maîtrisez les équations, les fonctions et les figures géométriques complexes.",
      image: "https://images.unsplash.com/photo-1582719464441-b4b18029c4e0", // Image géométrie
    },
  ];
  

  // Combine all levels into one array for demonstration
  const allCourses = [
    ...primaireCourses,
    ...moyenCourses,
    ...secondaireCourses,
  ];

  // Function to shuffle the array and pick a subset of courses
  const getRandomCourses = (courses, count) => {
    const shuffled = courses.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Select 6 random popular courses
  const popularCourses = getRandomCourses(allCourses, 6);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between p-4 space-x-4">
          {/* Navigation Menu - Left Side */}
          <NavigationMenu.Root className="NavigationMenuRoot">
            <NavigationMenu.List className="NavigationMenuList flex items-center">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="NavigationMenuTrigger  border rounded-md hover:bg-green-500 hover:border-green-500 transition duration-300">
                  Primaire <CaretDownIcon className="CaretDown" aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="NavigationMenuContent top-12">
                  <ul className="List one">
                    <ListItem href="https://stitches.dev/" title="1er Année">
                      {/* Content */}
                    </ListItem>
                    {/* Other list items... */}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="NavigationMenuTrigger  border rounded-md hover:bg-green-500 hover:border-green-500 transition duration-300">
                  Moyen <CaretDownIcon className="CaretDown" aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="NavigationMenuContent">
                  <ul className="List one">
                    <ListItem
                      title="1er Année"
                      href="/primitives/docs/overview/introduction"
                    ></ListItem>
                    {/* Other list items... */}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="NavigationMenuTrigger  border rounded-md hover:bg-green-500 hover:border-green-500 transition duration-300">
                  Secondaire <CaretDownIcon className="CaretDown" aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="NavigationMenuContent">
                  <ul className="List one">
                    <ListItem
                      title="1er Année"
                      href="/primitives/docs/overview/introduction"
                    ></ListItem>
                    {/* Other list items... */}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator className="NavigationMenuIndicator">
                <div className="Arrow" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="ViewportPosition">
              <NavigationMenu.Viewport className="NavigationMenuViewport" />
            </div>
          </NavigationMenu.Root>

          {/* SearchBar - Centered */}
          <div className="flex-grow flex justify-center">
            <SearchBar
              placeholder="Rechercher des niveaux..."
              onSearch={handleSearch}
              className="w-full max-w-md"
            />
          </div>

          {/* Login/Register Button - Right Side */}
          <div>
            <button
              onClick={toggleLoginModal}
              className="
            flex 
            items-center 
            justify-center 
            w-10 
            h-10 
            bg-blue-500 
            text-white 
            rounded-full 
            hover:bg-blue-600 
            transition-colors 
            duration-300
          "
            >
              <PersonIcon className="w-6 h-6" />
            </button>

            {/* Optional: Login Modal (can be expanded later) */}
            {isLoginModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <h2 className="text-xl font-bold mb-4">Login / Register</h2>
                  {/* Add login form or registration toggle here */}
                  <button
                    onClick={toggleLoginModal}
                    className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full py-24 text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600">
              Bienvenue sur notre plateforme d'apprentissage
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-8 mx-auto max-w-3xl">
              Explorez des cours sur mesure pour vous aider à exceller dans vos
              compétences et accomplir vos objectifs. Embarquez pour un voyage
              d’apprentissage inoubliable.
            </p>
            <div className="mt-4">
              <a
                href="#courses"
                className="text-lg text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-300"
              >
                Découvrez nos cours →
              </a>
            </div>
          </div>
        </div>

        <div className="w-full bg-gradient-to-br from-teal-500 to-emerald-600">
          <div className="container mx-auto py-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Cours Populaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  image={course.image}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 ">
          <h2 className="text-3xl font-bold text-center mb-8">
            Cours Populaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
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
  title: PropTypes.node.isRequired,
};

export default App;
