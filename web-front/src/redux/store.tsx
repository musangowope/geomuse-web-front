import { configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthStateType } from './slices/authSlice'
import playlistsReducer, { PlayListsStateType } from './slices/playlistsSlice'
import { useDispatch } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import { searchApi } from './queries/search'

export interface iReduxState {
  auth: AuthStateType
  playlists: PlayListsStateType
  searchApi: any
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    playlists: playlistsReducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store

setupListeners(store.dispatch)
