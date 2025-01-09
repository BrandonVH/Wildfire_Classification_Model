import React, { useState, useRef, useCallback } from 'react'
import { useJsApiLoader, GoogleMap, Autocomplete } from '@react-google-maps/api'
import MapViewLoadingSkeleton from './MapViewLoadingSkeleton'
import ControlPanel from './ControlPanel'
import SearchBar from './SearchBar'

const libraries = ['places']

const MapView = () => {
  const [map, setMap] = useState(null)
  const [zoomState, setZoomState] = useState(5)
  const [interestPoint, setInterestPoint] = useState(null)
  const [autocomplete, setAutocomplete] = useState(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  })

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance)
  }, [])

  const onMapUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const onZoomChanged = () => {
    if (map) {
      setZoomState(map.getZoom())
    }
  }

  const onAutocompleteLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance)
  }, [])

  const handleOnPlaceChanged = () => {
    if (!autocomplete) return

    const place = autocomplete.getPlace()

    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      
      if (map) {
        setInterestPoint({lat, lng})
        setZoomState(14)
      }
    }
  }

  if (!isLoaded) return <MapViewLoadingSkeleton />

  return (
    <div className="relative h-full w-full">
      <div className="relative w-full sm:w-3/4 md:w-1/2 mx-auto">
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={handleOnPlaceChanged}
        >
          <SearchBar autocomplete={autocomplete} />
        </Autocomplete>
      </div>
      <GoogleMap
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        center={interestPoint || { lat: 48.8584, lng: 2.2945 }}
        zoom={zoomState}
        onZoomChanged={onZoomChanged}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeId: 'satellite',
        }}
      >
      </GoogleMap>
      <ControlPanel 
        props={{ zoomState, setZoomState }}
      />
    </div>
  )
}

export default MapView