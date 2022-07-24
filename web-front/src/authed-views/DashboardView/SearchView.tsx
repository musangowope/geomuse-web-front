import React from 'react'
import { navigate, RouteComponentProps } from '@reach/router'

import MusicSearch from '../../components/redux-components/MusicSearch'
import TrackCard from '../../components/simple-components/TrackCard'
import { TrackType } from '../../redux/slices/playlistsSlice'

const genreFilters = [
  {
    label: 'Ambient',
    value: 'ambient',
  },
  {
    label: 'Beats',
    value: 'beats',
  },
  {
    label: 'Blues',
    value: 'blues',
  },
  {
    label: 'Jazz',
    value: 'jazz',
  },
  {
    label: 'Country',
    value: 'country',
  },
  {
    label: 'Electronic',
    value: 'electronic',
  },
  {
    label: 'Folk',
    value: 'folk',
  },
  {
    label: 'Hip Hop',
    value: 'hiphop',
  },
  {
    label: 'Orchestral',
    value: 'orchestral',
  },
  {
    label: 'Pop',
    value: 'pop',
  },
  {
    label: 'Rock',
    value: 'rock',
  },
  {
    label: 'RnB & Soul',
    value: 'rnb and soul',
  },
  {
    label: 'Vintage',
    value: 'vintage',
  },
]

const SearchView = ({}: RouteComponentProps) => {
  return (
    <div className='search-view'>
      <div className='tw-container tw-mx-auto'>
        <MusicSearch genreFilters={genreFilters}>
          {({ data }: { data: TrackType[] }) =>
            data.map((track: TrackType, index: React.Key | null | undefined) => (
              <TrackCard
                key={index}
                image={track.image}
                name={track.name}
                artist={track.artist}
                onMenuClick={() =>
                  navigate('/playlists', {
                    state: { track },
                  })
                }
              />
            ))
          }
        </MusicSearch>
      </div>
    </div>
  )
}

export default SearchView
