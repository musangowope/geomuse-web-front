import React from 'react'

import GoogleMapReact from 'google-map-react'
import { iReduxState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { addPlaylistAsync } from '../../redux/slices/playlistsSlice'

const AnyReactComponent = ({ text = '' }) => <div>{text}</div>

export default function MusicMap() {
  const [coordinates, setCoordinates] = React.useState<{
    lat: number | null
    lng: number | null
  }>({
    lat: null,
    lng: null,
  })

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }

  const dispatch = useAppDispatch()
  const { playlists } = useSelector((state: iReduxState) => state.playlists)

  const onMapClick = (e: { lat: number; lng: number }) => {
    dispatch(
      addPlaylistAsync({
        name: `${e.lat} ${e.lng}`,
        tracks: [],
        lat: e.lat,
        lng: e.lng,
        dateCreated: new Date(),
        isDraft: true,
      }),
    )
  }

  return (
    // Important! Always set the container height explicitly

    <div style={{ height: '100vh', width: '100%' }}>
      {coordinates.lat && coordinates.lng ? (
        <GoogleMapReact
          draggable
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          defaultCenter={{
            lng: coordinates.lng,
            lat: coordinates.lat,
          }}
          defaultZoom={15}
          onClick={onMapClick}
        >
          {playlists.map((playlist) => (
            <AnyReactComponent key={playlist.id} text={playlist.name} />
          ))}
        </GoogleMapReact>
      ) : null}
    </div>
  )
}
