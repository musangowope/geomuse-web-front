import React from 'react'

import GoogleMapReact from 'google-map-react'

export default function MusicMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      defaultProps.center.lat = position.coords.latitude
      defaultProps.center.lng = position.coords.longitude
    })
  }
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        draggable
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  )
}
