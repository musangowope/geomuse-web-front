import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { addPlaylistAsync, PlaylistType } from '../../redux/slices/playlistsSlice'
import { iReduxState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'

const render = (status: Status) => {
  return <h1>{status}</h1>
}

const MusicMap: React.FC = () => {
  const [zoom, setZoom] = React.useState(15) // initial zoom
  const [mapInstance, setMapInstance] = React.useState<any>()
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  const dispatch = useAppDispatch()
  const { playlists } = useSelector((state: iReduxState) => state.playlists)
  const onClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() || 0
    const lng = e.latLng?.lng() || 0
    dispatch(
      addPlaylistAsync({
        name: `${lat} ${lng}`,
        tracks: [],
        lat,
        lng,
        dateCreated: new Date(),
        isDraft: true,
      }),
    )
  }

  const onIdle = (m: google.maps.Map) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setZoom(m.getZoom()!)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCenter(m.getCenter()?.toJSON())
  }

  const apiKey: string = process.env.GOOGLE_MAPS_API_KEY || ''


  return (
    <div style={{ display: 'flex', height: '100%' }}>
       <Wrapper apiKey={apiKey} render={render} callback={() => setMapInstance(window.google)}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: '1', height: '100%' }}
        >
           {playlists.map((playlist, i) =>
            mapInstance && playlist.lat && playlist.lng && google ? (
              <Marker
                key={i}
                position={
                  new mapInstance.maps.LatLng({
                    lat: playlist.lat,
                    lng: playlist.lng,
                  })
                }
              />
            ) : null,
           )}
        </Map>
       </Wrapper>
    </div>
  )
}
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string }
  onClick?: (e: google.maps.MapMouseEvent) => void
  onIdle?: (map: google.maps.Map) => void
  children?: React.ReactNode
}

const Map: React.FC<MapProps> = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options)
    }
  }, [map, options])

  React.useEffect(() => {
    if (map) {
      ;['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName))

      if (onClick) {
        map.addListener('click', onClick)
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map))
      }
    }
  }, [map, onClick, onIdle])

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

interface iMarker extends google.maps.MarkerOptions {
  playlist?: PlaylistType
}

const Marker: React.FC<iMarker> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>()

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  return null
}

function useDeepCompareEffectForMaps(callback: React.EffectCallback, dependencies: any[]) {
  React.useEffect(callback, [callback])
}

export default MusicMap
