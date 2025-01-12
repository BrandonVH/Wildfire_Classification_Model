import React from 'react'
import { FaPlus, FaMinus, FaLayerGroup } from 'react-icons/fa'

const ControlPanel = ({ props }) => {
  const handleZoomIn = (e) => {
    e.preventDefault()
    if (props.zoomState == 22) return;
    props.setZoomState(prev => prev + 1)
  }

  const handleZoomOut = (e) => {
    e.preventDefault()
    if (props.zoomState == 1) return;
    props.setZoomState(prev => prev - 1)
  }

  return (
    <div className="absolute bottom-6 right-6 flex flex-col items-end">
      <div className="mb-2 bg-white rounded-full shadow-md">
        <button onClick={(e) => handleZoomIn(e)} className="p-2 hover:bg-gray-300 rounded-l-full">
          <FaPlus className="w-4 h-4" />
        </button>
        <button onClick={(e) => handleZoomOut(e)} className="p-2 hover:bg-gray-300 rounded-r-full">
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