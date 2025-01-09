import React from 'react'

const MapViewLoadingSkeleton = () => {
  return (
    <div className="h-full w-full bg-gray-200">
      <div className="h-full w-full grid grid-cols-4 grid-rows-4">
        {[...Array(16)].map((_, index) => (
          <div key={index} className="border border-gray-300 bg-gray-100"></div>
        ))}
      </div>
    </div>
  )
}

export default MapViewLoadingSkeleton