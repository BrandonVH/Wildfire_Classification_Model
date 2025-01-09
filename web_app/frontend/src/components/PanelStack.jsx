import React, { useState, useRef } from "react";
import { FaMap, FaInfo, FaCompass, FaCog } from "react-icons/fa";

const panels = [
  { icon: FaMap, title: "Map", content: "Map settings and layers" },
  { icon: FaInfo, title: "Info", content: "Information about the area" },
  { icon: FaCompass, title: "Directions", content: "Get directions" },
  { icon: FaCog, title: "Settings", content: "App settings" },
];

const PanelStack = () => {
  const [activePanel, setActivePanel] = useState(null); // Track fully exposed panel
  const [isAnimating, setIsAnimating] = useState(false); // Flag to track animation state
  const panelStackRef = useRef(null); // Ref for the entire stack

  const handleMouseEnter = async (index) => {
    if (isAnimating || index === activePanel) return; // Skip if animating or already active
    setActivePanel(index); // Set the hovered panel as active

    // Wait for the animation to complete before allowing new interactions
    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Match CSS duration
    setIsAnimating(false);
  };

  const handleMouseLeave = (event) => {
    const panelStackBounds = panelStackRef.current.getBoundingClientRect();

    // Only collapse panels if the mouse leaves the panel stack area
    if (
      event.clientX < panelStackBounds.left ||
      event.clientX > panelStackBounds.right ||
      event.clientY < panelStackBounds.top ||
      event.clientY > panelStackBounds.bottom
    ) {
      setActivePanel(null);
    }
  };

  return (
    <div
      ref={panelStackRef}
      className="absolute bottom-[4.5rem] left-6 flex flex-col-reverse"
      onMouseLeave={handleMouseLeave}
    >
      {panels.map((panel, index) => (
        <div
          key={index}
          className={`cursor-default bg-white rounded-md shadow-md p-5 w-[19.2rem] transition-all duration-300 ease-in-out ${
            activePanel !== null && index === activePanel + 1
              ? "mb-2" // raised state
              : "-mb-16"
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          <div className="flex items-center mb-3">
            <panel.icon className="w-7 h-7 mr-3" />
            <h3 className="text-lg font-semibold">{panel.title}{index}</h3>
          </div>
          <p
            className={`text-base transition-opacity duration-300 ${
              index === activePanel || (activePanel === null && index === panels.length - 1)
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            {panel.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PanelStack;