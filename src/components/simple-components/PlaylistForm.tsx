import React from 'react'
import { PlaylistType, TrackType } from '../../redux/slices/playlistsSlice'
import MusicSearch from '../redux-components/MusicSearch'
import TrackCard from './TrackCard'
import uniqid from 'uniqid'

type PlaylistFormType = {
  playlist: PlaylistType
  onPlaylistChange: (playlist: PlaylistType) => any
}

const defaultPlaylist = {
  id: uniqid('playlist'),
  name: '',
  dateCreated: new Date(),
  tracks: [],
  isDraft: false,
}

const PlaylistForm = ({
  playlist = defaultPlaylist,
  onPlaylistChange = () => false,
}: PlaylistFormType) => {
  const handleInputChange = (e: { target: { value: any } }) => {
    const newPlaylist = {
      ...playlist,
      name: e.target.value,
    }
    onPlaylistChange(newPlaylist)
  }

  const addTrack = (track: TrackType) => {
    const newPlaylist = {
      ...playlist,
      tracks: [...playlist.tracks, track],
    }
    onPlaylistChange(newPlaylist)
  }

  const removeTrack = (id: string | undefined) => {
    const newPlaylist = {
      ...playlist,
      tracks: playlist.tracks.filter((track) => track.id !== id),
    }
    onPlaylistChange(newPlaylist)
  }

  return (
    <form>
      <label>
        <div>Playlist name</div>
        <input type='text' name='name' onChange={handleInputChange} value={playlist.name} />
      </label>
      {playlist.tracks.map((track, index) => (
        <div key={index}>
          <div>Track name: {track.name}</div>
          <div>
            <button type='button' onClick={() => removeTrack(track.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <div>
        <MusicSearch>
          {({ data }: { data: TrackType[] }) =>
            data.map((track: TrackType, index: React.Key | null | undefined) => (
              <TrackCard
                key={index}
                image={track.image}
                name={track.name}
                artist={track.artist}
                onMenuClick={() => addTrack(track)}
              />
            ))
          }
        </MusicSearch>
      </div>
    </form>
  )
}

export default PlaylistForm
