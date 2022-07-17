import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import uniqid from 'uniqid'
import { baseRequest } from '../../utils/common-data'
import { BaseRequestType } from '../../utils/common-types-and-interfaces'

export type TrackType = {
  id?: string
  image: string
  name: string
  artist: string
  trackUrl: string
  lat: number | string
  long: number | string
}

export type PlaylistType = {
  id?: string
  name: string
  dateCreated: Date
  tracks: Array<TrackType>
  isDraft: boolean
}

export type PlayListsStateType = {
  request: BaseRequestType
  playlists: Array<PlaylistType>
}

export const addPlaylistAsync = createAsyncThunk(
  'playlist/addPlaylistAsync',
  async (payload: PlaylistType) => {
    const response = await fetch('http://localhost:8000/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (response.ok) {
      const playlist = await response.json()
      return { playlist } as {
        [key: string]: any
        playlist: PlaylistType
      }
    }
  },
)

export const deletePlaylistAsync = createAsyncThunk(
  'playlist/deletePlaylistAsync',
  async (id: string) => {
    const response = await fetch(`http://localhost:8000/playlists/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      return { id }
    }
  },
)

export const getPlaylistsAsync = createAsyncThunk('playlist/getPlaylistsAsync', async () => {
  const response = await fetch('http://localhost:8000/playlists')
  if (response.ok) {
    const playlists = await response.json()
    return { playlists }
  }
})

export const updatePlaylistAsync = createAsyncThunk(
  'playlist/updatePlaylistAsync',
  async (payload: PlaylistType) => {
    const response = await fetch(`http://localhost:8000/playlists/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (response.ok) {
      const playlist = await response.json()
      return { playlist }
    }
  },
)

const initialState: PlayListsStateType = {
  request: baseRequest,
  playlists: [],
}

const playlistsSlice = createSlice({
  name: 'playlist',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    // add addPlaylistAsync cases
    builder.addCase(addPlaylistAsync.pending, (state: PlayListsStateType) => {
      state.request = { ...baseRequest, loading: true }
    })

    builder.addCase(addPlaylistAsync.fulfilled, (state: PlayListsStateType, action) => {
      state.request = { ...baseRequest, success: true }
      if (action.payload) {
        state.playlists.push(action.payload.playlist)
      }
    })

    builder.addCase(addPlaylistAsync.rejected, (state: PlayListsStateType) => {
      state.request = { ...baseRequest, failed: true }
    })

    // updatePlaylistAsync cases
    builder.addCase(updatePlaylistAsync.pending, (state: PlayListsStateType) => {
      state.request = { ...baseRequest, loading: true }
    })
    builder.addCase(updatePlaylistAsync.fulfilled, (state: PlayListsStateType, action) => {
      state.request = { ...baseRequest, success: true }
      if (action.payload) {
        const payload = action.payload
        const targetIndex = state.playlists.findIndex((item) => item.id === payload.playlist.id)
        state.playlists[targetIndex] = { ...payload.playlist }
      }
    })

    // removePlaylist cases
    builder.addCase(deletePlaylistAsync.pending, (state: PlayListsStateType) => {
      state.request = { ...baseRequest, loading: true }
    })
    builder.addCase(deletePlaylistAsync.fulfilled, (state: PlayListsStateType, action) => {
      state.request = { ...baseRequest, success: true }
      if (action.payload) {
        const payload = action.payload
        const targetIndex = state.playlists.findIndex((playlist) => playlist.id === payload.id)
        state.playlists.splice(targetIndex, 1)
      }
    })

    builder.addCase(deletePlaylistAsync.rejected, (state: PlayListsStateType) => {
      state.request = { ...baseRequest, failed: true }
    })

    builder.addCase(getPlaylistsAsync.pending, (state: PlayListsStateType) => {
      state.request = { ...baseRequest, loading: true }
    })
    builder.addCase(getPlaylistsAsync.fulfilled, (state: PlayListsStateType, action) => {
      state.request = { ...baseRequest, success: true }
      if (action.payload) {
        const payload = action.payload
        state.playlists = [...payload.playlists]
      }
    })

    builder.addCase(getPlaylistsAsync.rejected, (state: PlayListsStateType) => {
      state.request = { ...baseRequest, failed: true }
    })
  },
})

export default playlistsSlice.reducer
