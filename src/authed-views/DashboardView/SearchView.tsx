import React from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import { useGetSearchResultsQuery } from '../../redux/queries/search'
import GenreCard from '../../components/GenreCard'
import TrackCard from '../../components/TrackCard'

const genres = [
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

export interface iTrackType {
  image?: string
  name?: string
  artist?: string
}

const SearchView = ({}: RouteComponentProps) => {
  const [q, setQ] = React.useState<string>('')
  const [genresFilter, setGenresFilter] = React.useState<string[]>([])
  const [query, setQuery] = React.useState('')

  const onQChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setQ(e.target.value)
  }

  React.useEffect(() => {
    if (q || genresFilter.length) {
      const queryData: {
        [key: string]: string
      } = {
        ...(q ? { q } : {}),
        ...(genresFilter.length ? { genres: genresFilter.join('+') } : {}),
      }
      const string = Object.keys(queryData)
        .map((key) => {
          return `${key}=${queryData[key]}`
        })
        .join('&')
      setQuery(string)
    }
  }, [q, genresFilter.length, genresFilter])

  const onGenreClick = (genre: string) => {
    setGenresFilter((prev) => [...prev, genre])
  }

  const { data = [], isLoading } = useGetSearchResultsQuery(query)

  return (
    <div className='search-view'>
      <div className='tw-container tw-mx-auto'>
        <div>
          <input placeholder='Search tracks' onChange={onQChange} />
        </div>
        <div className='tw-flex tw-gap-2'>
          {genres.map((genre: { label: string; value: string }, index) => (
            <GenreCard key={index} onClick={() => onGenreClick(genre.value)} title={genre.label} />
          ))}
        </div>
        {isLoading ? <div>LOADING</div> : null}

        <div className='tw-gap-2 tw-grid tw-grid-cols-4'>
          {data.map((track: iTrackType, index: React.Key | null | undefined) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchView
