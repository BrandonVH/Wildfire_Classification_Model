import React from 'react'
import { FaPlus, FaMinus, FaLayerGroup } from 'react-icons/fa'

function ControlPanel() {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col items-end">
      <div className="mb-2 bg-white rounded-full shadow-md">
        <button className="p-2">
          <FaPlus className="w-4 h-4" />
        </button>
        <button className="p-2">
          <FaMinus className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-white rounded-md shadow-md p-2">
        <FaLayerGroup className="w-5 h-5" />
      </div>
    </div>
  )
}

export default ControlPanel