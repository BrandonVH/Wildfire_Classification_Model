import React, { useRef } from 'react'
import { FaSearch, FaMicrophone } from 'react-icons/fa'

const SearchBar = ({ autocomplete }) => {

  const inputRef = useRef(null)

  const handleSearch = (e) => {
    if (!autocomplete || !inputRef || !inputRef.current || !e.nativeEvent.isTrusted) return;

    e.preventDefault()

    const pacContainer = document.querySelector('.pac-container');
    if (pacContainer) {
      const pacItems = pacContainer.querySelectorAll('.pac-item');
      if (pacItems.length > 0) {
        const downArrowEvent = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          keyCode: 40,
          which: 40,
          bubbles: true,
          cancelable: true,
        });
        inputRef.current.dispatchEvent(downArrowEvent);

        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
        });

        inputRef.current.dispatchEvent(enterEvent);
      }
    }
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2/3 max-w-xl z-10">
      <div className="flex items-center bg-white rounded-md shadow-md p-2">
        <div onClick={(e) => handleSearch(e)} className="mr-2 cursor-pointer">
          <FaSearch className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          ref={inputRef}
          placeholder="Search Location"
          className="flex-1 py-1 px-2 text-base outline-none"
          onKeyDown={(e) => { e.key === "Enter" && handleSearch(e) }}
        />
        <div className="ml-2">
          <FaMicrophone className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar