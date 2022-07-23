import React from 'react'
import { RouteComponentProps, useParams } from '@reach/router'
import PlaylistForm from '../../components/simple-components/PlaylistForm'
import { useSelector } from 'react-redux'
import { iReduxState, useAppDispatch } from '../../redux/store'
import { PlaylistType, updatePlaylistAsync } from '../../redux/slices/playlistsSlice'

const PlaylistView = ({}: RouteComponentProps) => {
  const { id = '' } = useParams()
  const playlists = useSelector((state: iReduxState) => state.playlists)
  const playlist: PlaylistType | undefined = playlists.playlists.find(
    (playlist) => playlist.id === id,
  )

  const dispatch = useAppDispatch()

  const updatePlaylist = async (playlist: PlaylistType) => {
    dispatch(updatePlaylistAsync(playlist))
  }

  return (
    <div className='search-view'>
      {playlist ? <PlaylistForm playlist={playlist} onPlaylistChange={updatePlaylist} /> : null}
    </div>
  )
}

export default PlaylistView
