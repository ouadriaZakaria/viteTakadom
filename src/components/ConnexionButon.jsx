import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SplitGradientButton = () => {
  const [isHoveredConnexion, setIsHoveredConnexion] = useState(false);
  const [isHoveredInscription, setIsHoveredInscription] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);

  const handleAuthClick = (action) => {
    setActiveTab(action);
    setSelectedAction(action); // Set the selected action
    setShowRoleSelection(true); // Show the role selection modal
  };

  const handleRoleSelect = (role) => {
    setShowRoleSelection(false);
    navigate(`/${selectedAction}?role=${role}`); // Navigate with role as a query param
  };

  return (
    <div>
      {/* Auth Buttons */}
      <div className="inline-flex rounded-lg overflow-hidden shadow-lg">
        {/* Connexion Button */}
        <button
          onClick={() => handleAuthClick("connexion")}
          onMouseEnter={() => setIsHoveredConnexion(true)}
          onMouseLeave={() => setIsHoveredConnexion(false)}
          className="relative px-4 py-2 font-semibold text-white transition-all duration-300 rounded-l-lg border-r border-green-200 text-sm"
          style={{
            background: activeTab === "connexion"
              ? "linear-gradient(45deg, #00c853, #64dd17)"
              : "linear-gradient(45deg, #2e7d32, #388e3c)",
            boxShadow: isHoveredConnexion && activeTab !== "connexion"
              ? "0 4px 12px rgba(0, 200, 83, 0.2)"
              : "none",
          }}
        >
          Connexion
        </button>

        {/* Inscription Button */}
        <button
          onClick={() => handleAuthClick("inscription")}
          onMouseEnter={() => setIsHoveredInscription(true)}
          onMouseLeave={() => setIsHoveredInscription(false)}
          className="relative px-4 py-2 font-semibold text-white transition-all duration-300 rounded-r-lg text-sm"
          style={{
            background: activeTab === "inscription"
              ? "linear-gradient(45deg, #00c853, #64dd17)"
              : "linear-gradient(45deg, #2e7d32, #388e3c)",
            boxShadow: isHoveredInscription && activeTab !== "inscription"
              ? "0 4px 12px rgba(0, 200, 83, 0.2)"
              : "none",
          }}
        >
          Inscription
        </button>
      </div>

      {/* Role Selection Modal */}
      {showRoleSelection && (
        <div className="role-selection-modal">
          <div className="modal-content">
            <h2>Choose Your Role</h2>
            <button onClick={() => handleRoleSelect("student")}>Student</button>
            <button onClick={() => handleRoleSelect("teacher")}>Teacher</button>
            <button onClick={() => setShowRoleSelection(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitGradientButton;
