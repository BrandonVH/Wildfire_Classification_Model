import React, { useState } from 'react'
import MapView from './components/MapView'
import SidePanel from './components/SidePanel'
import PanelStack from './components/PanelStack'

function App() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <MapView />
      <SidePanel />
      <div className="absolute bottom-5 left-0 w-[19.2rem] h-[calc(50vh-8rem)]">
        <PanelStack />
      </div>
    </div>
  )
}

export default App