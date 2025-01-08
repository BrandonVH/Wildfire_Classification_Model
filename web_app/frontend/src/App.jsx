import React from 'react'
import MapView from './components/MapView'
import SearchBar from './components/SearchBar'
import SidePanel from './components/SidePanel'
import ControlPanel from './components/ControlPanel'
import PanelStack from './components/PanelStack'

function App() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="w-full sm:w-3/4 md:w-1/2 mx-auto">
        <SearchBar />
      </div>
      <MapView />
      <SidePanel />
      <ControlPanel />
      <div className="absolute bottom-5 left-0 w-[19.2rem] h-[calc(50vh-8rem)]">
        <PanelStack />
      </div>
    </div>
  )
}

export default App