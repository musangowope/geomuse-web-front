import React from 'react'
import { useGetSearchResultsQuery } from '../../redux/queries/search'
import GenreCard from '../simple-components/GenreCard'

type GenreFilterType = {
  label: string
  value: string
}

type MusicSearchType = {
  children?: any
  genreFilters?: GenreFilterType[]
}

const MusicSearch = ({ children, genreFilters = [] }: MusicSearchType) => {
  const [q, setQ] = React.useState<string>('')
  const [genreFiltersState, setGenreFiltersState] = React.useState<string[]>([])
  const [query, setQuery] = React.useState('')

  const onQChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setQ(e.target.value)
  }

  React.useEffect(() => {
    if (q || genreFiltersState.length) {
      const queryData: {
        [key: string]: string
      } = {
        ...(q ? { q } : {}),
        ...(genreFiltersState.length ? { genres: genreFiltersState.join('+') } : {}),
      }
      const string = Object.keys(queryData)
        .map((key) => {
          return `${key}=${queryData[key]}`
        })
        .join('&')
      setQuery(string)
    }
  }, [q, genreFiltersState.length, genreFiltersState])

  const onGenreClick = (genre: string) => {
    setGenreFiltersState((prev) => [...prev, genre])
  }

  const { data = [], isLoading } = useGetSearchResultsQuery(query)

  return (
    <div className='music-search'>
      <div>
        <input placeholder='Search tracks' onChange={onQChange} />
      </div>
      <div className='tw-flex tw-gap-2'>
        {genreFilters.map((genre, index) => (
          <GenreCard key={index} onClick={() => onGenreClick(genre.value)} title={genre.label} />
        ))}
      </div>

      <div className='tw-gap-2 tw-grid tw-grid-cols-4'>
        {typeof children === 'function'
          ? children({
              data,
              isLoading,
            })
          : null}
      </div>
    </div>
  )
}

export default MusicSearch
