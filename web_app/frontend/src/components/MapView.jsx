import React, { useState, useRef, useCallback } from 'react'
import { useJsApiLoader, GoogleMap, Autocomplete } from '@react-google-maps/api'
import MapViewLoadingSkeleton from './MapViewLoadingSkeleton'
import ControlPanel from './ControlPanel'
import SearchBar from './SearchBar'

const libraries = ['places']

//  -124.848974,24.396308,-66.885444,49.384358
const UNITED_STATES_BOUNDS = {
  north: 49.384358,
  south: 24.396308,
  west: -124.848974,
  east: -66.885444
}

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
        console.log(`search; lat: ${lat}, lng: ${lng}`)
        setInterestPoint({lat, lng})
        setZoomState(14)
      }
    }
  }

  const handleMapClick = (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    setInterestPoint({lat, lng})
    console.log(`click; lat: ${lat}, lng: ${lng}`)
    setZoomState(prev => prev < 14 ? 14 : prev)
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
          disableDoubleClickZoom: true,
          restriction: {
            latLngBounds: UNITED_STATES_BOUNDS,
            strictBounds: false,
          }
        }}
        onClick={(e) => handleMapClick(e)}
      >
      </GoogleMap>
      <ControlPanel 
        props={{ zoomState, setZoomState }}
      />
    </div>
  )
}

export default MapView