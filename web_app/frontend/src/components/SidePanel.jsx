import React from 'react'

function SidePanel() {
  return (
    <div className="absolute top-0 left-0 h-full w-96 bg-white shadow-md transform -translate-x-full transition-transform duration-300 ease-in-out">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Explore nearby</h2>
        <ul>
          <li className="mb-2">Restaurants</li>
          <li className="mb-2">Hotels</li>
          <li className="mb-2">Attractions</li>
        </ul>
      </div>
    </div>
  )
}

export default SidePanel