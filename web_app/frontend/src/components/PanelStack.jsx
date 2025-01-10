import React, { useState, useRef, useEffect } from "react";
import { FaMap, FaInfo, FaCompass, FaCog } from "react-icons/fa";

const panels = [
  { icon: FaMap, title: "Map", content: "Map settings and layers" },
  { icon: FaCog, title: "Settings", content: "App settings" },
  { icon: FaCompass, title: "Directions", content: "Get directions" },
  { icon: FaInfo, title: "Info", content: "Click on map to view wildfire risk analysis" },
];

const PanelStack = () => {
  const [activePanel, setActivePanel] = useState(null); 
  const [pendingAnimatedPanel, setPendingAnimatedPanel] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false); 
  const panelStackRef = useRef(null);

  useEffect(() => {
    if (isAnimating || pendingAnimatedPanel === activePanel) return;
    let firstTimer, secondTimer;
    firstTimer = setTimeout(() => {
      setActivePanel(pendingAnimatedPanel)
  
      setIsAnimating(true);
      secondTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); 
    }, 150)

    return () => {
      clearTimeout(firstTimer)
      clearTimeout(secondTimer)
      setIsAnimating(false)
    }
  }, [isAnimating, pendingAnimatedPanel]);

  const handleMouseEnter = (index) => {
    if (index === pendingAnimatedPanel) return;
    setPendingAnimatedPanel(index);
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
      setActivePanel(null)
      setPendingAnimatedPanel(null)
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