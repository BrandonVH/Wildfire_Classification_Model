import React from 'react'
import { FaSearch, FaMicrophone } from 'react-icons/fa'

function SearchBar() {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2/3 max-w-xl z-10">
      <div className="flex items-center bg-white rounded-md shadow-md p-2">
        <div className="mr-2">
          <FaSearch className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search Location"
          className="flex-1 py-1 px-2 text-base outline-none"
        />
        <div className="ml-2">
          <FaMicrophone className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar