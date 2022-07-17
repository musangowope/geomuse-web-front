import React from 'react'
import { PlaylistType } from '../redux/slices/playlistsSlice'

type PlaylistFormType = {
  playlist: PlaylistType
}

const PlaylistForm = ({ playlist }: PlaylistFormType) => {
  const [formState, setFormState] = React.useState(playlist)
  return (
    <form>
      <label>
        <div>Playlist name</div>
        <input type='text' />
      </label>
      {formState.tracks.map((track, index) => (
        <div key={index}>
          <div>Track name: {track.name}</div>
          <div>
            <button type='button'>Delete</button>
          </div>
        </div>
      ))}
      <div>
        <div>
          <label>Search for songs</label>
          <input type='text' />
        </div>
      </div>
    </form>
  )
}

export default PlaylistForm
