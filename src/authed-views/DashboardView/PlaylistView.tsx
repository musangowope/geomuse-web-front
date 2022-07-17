import React from 'react'
import { RouteComponentProps, useParams } from '@reach/router'
import PlaylistForm from '../../components/PlaylistForm'
import { useSelector } from 'react-redux'
import { iReduxState } from '../../redux/store'
import { PlaylistType } from '../../redux/slices/playlistsSlice'

const PlaylistView = ({}: RouteComponentProps) => {
  const { id = '' } = useParams()
  const playlists = useSelector((state: iReduxState) => state.playlists)
  const playlist = playlists.playlists.find((playlist) => playlist.id === id) as PlaylistType
  return (
    <div className='search-view'>
      <PlaylistForm playlist={playlist} />
    </div>
  )
}

export default PlaylistView
