import * as React from "react";
import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

// Helper component for menu items
const MenuListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(
            "block p-3 hover:bg-green-50 rounded-md transition-colors",
            className
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="font-medium text-green-700">{title}</div>
          {children && <p className="text-sm text-gray-600">{children}</p>}
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

MenuListItem.displayName = "MenuListItem";

MenuListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

// Sub-menu for modules
const ModuleSubmenu = ({ modules, yearId, levelPath }) => {
  return (
    <div className="p-2 bg-white rounded-md shadow-md border border-gray-100 min-w-48">
      <ul className="space-y-1">
        {modules.map((module) => (
          <li key={module.id}>
            <Link
              to={`/${levelPath}/${yearId}/module/${module.id}`}
              className="block p-2 hover:bg-green-50 rounded-md transition-colors text-green-700"
            >
              {module.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

ModuleSubmenu.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  yearId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  levelPath: PropTypes.string.isRequired,
};

// The main multi-level navigation component
const MultiLevelNavMenu = ({ educationLevels }) => {
  const [activeYear, setActiveYear] = useState(null);

  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List className="flex items-center gap-2">
        {educationLevels.map((level) => (
          <NavigationMenu.Item key={level.id} className="relative">
            {/* Level Trigger */}
            <NavigationMenu.Trigger
              className="flex items-center gap-1 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition-all border border-gray-200 font-medium"
            >
              {level.name} <CaretDownIcon className="w-4 h-4" aria-hidden />
            </NavigationMenu.Trigger>
            
            {/* First Level Content - Years */}
            <NavigationMenu.Content className="absolute top-full left-0 mt-1 w-48 p-2 bg-white rounded-md shadow-md z-20 border border-gray-100">
              <ul className="space-y-1">
                {level.years.map((year) => (
                  <li key={year.id} className="relative group">
                    {/* Year item with modules dropdown */}
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
                      onMouseEnter={() => setActiveYear(year.id)}
                    >
                      <Link 
                        to={`/${level.path}/${year.id}`}
                        className="flex-grow text-green-700"
                      >
                        {year.name}
                      </Link>
                      <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                      
                      {/* Third level - Modules */}
                      {activeYear === year.id && (
                        <div 
                          className="absolute left-full top-0 ml-1 z-30"
                          onMouseLeave={() => setActiveYear(null)}
                        >
                          <ModuleSubmenu 
                            modules={year.modules} 
                            yearId={year.id} 
                            levelPath={level.path} 
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="absolute top-full left-0 mt-2 w-auto" />
    </NavigationMenu.Root>
  );
};

MultiLevelNavMenu.propTypes = {
  educationLevels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      years: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          name: PropTypes.string.isRequired,
          modules: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
              name: PropTypes.string.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default MultiLevelNavMenu;