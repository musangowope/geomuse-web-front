import React from 'react'
import { Link, navigate, RouteComponentProps } from '@reach/router'
import TrackCard from '../../components/TrackCard'
import { iReduxState, useAppDispatch } from '../../redux/store'
import {
  addPlaylistAsync,
  deletePlaylistAsync,
  PlaylistType,
} from '../../redux/slices/playlistsSlice'
import { useSelector } from 'react-redux'
import PlaylistPreview from '../../components/PlaylistPreview'
import uniqid from 'uniqid'

const PlaylistsView = ({
  location: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    state: { track = null },
  },
}: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const playlists = useSelector((state: iReduxState) => state.playlists)

  const createPlaylist = async () => {
    const playlist: PlaylistType = {
      id: uniqid('playlist'),
      name: uniqid('playlist'),
      tracks: [],
      isDraft: true,
      dateCreated: new Date(),
    }
    if (track) {
      playlist.tracks.push(track)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response: {
      payload: {
        [key: string]: any
        playlist: PlaylistType
      }
    } = await dispatch(addPlaylistAsync(playlist))
    navigate(`/playlists/${response.payload.playlist.id}`)
  }

  const deletePlayList = async (id: string | undefined) => {
    if (id) {
      await dispatch(deletePlaylistAsync(id))
    }
  }

  return (
    <div className='search-view'>
      {track ? <TrackCard image={track.image} name={track.name} artist={track.artist} /> : null}
      <div className='tw-text-white'>Add song to playlist</div>
      <div>
        <button type='button' className='tw-bg-fuchsia-800 p-2' onClick={createPlaylist}>
          New playlist
        </button>
      </div>
      {playlists.playlists.map((playlist, index) => (
        <div className='tw-mb-5' key={index}>
          <PlaylistPreview
            key={index}
            numberOfSongs={playlist.tracks.length}
            name={playlist.name}
          />
          <div className='tw-flex'>
            <Link className='tw-mr-2 tw-bg-fuchsia-800' to={`/playlists/${playlist.id}`}>
              Edit
            </Link>
            <button
              className='tw-bg-fuchsia-800'
              onClick={() => deletePlayList(playlist.id)}
              type='button'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlaylistsView
