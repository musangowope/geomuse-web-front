import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { navigate } from '@reach/router'

interface iLogoutPayload {
  id: string
}

export interface iLoginPayload {
  username: string
  password: string
}

export interface iUser {
  jwt: string
  username: string
  id: string
}

interface iRequest {
  failed: boolean
  success: boolean
  loading: boolean
  error: Error | null
}

export type AuthStateType = {
  request: iRequest
  user: iUser
}

export const loginAsync = createAsyncThunk('auth/loginAsync', async (payload: iLoginPayload) => {
  // TODO: Fake call. Make call to real endpoint when built
  const user = await new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        jwt: '9435439857',
        username: payload.username,
        id: '2134',
      })
    }, 500)
  })
  window.localStorage.setItem('user', JSON.stringify(user))
  return { user }
})

export const logoutAsync = createAsyncThunk('log/logoutAsync', async (payload: iLogoutPayload) => {
  const response = await fetch('http://localhost:7000/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (response.ok) {
    const user = await response.json()
    return { user }
  }
})

const baseRequestState = {
  loading: false,
  success: false,
  failed: false,
  error: null,
}

const getUserSession = () => {
  const user = localStorage.getItem('user')
  return user
    ? (JSON.parse(user) as iUser)
    : {
        jwt: '',
        username: '',
        id: '',
      }
}

const initialState = {
  request: baseRequestState,
  user: getUserSession(),
} as AuthStateType

const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state: AuthStateType) => {
      state.request = { ...baseRequestState, loading: true }
    })

    builder.addCase(loginAsync.fulfilled, (state: AuthStateType, action) => {
      state.request = { ...baseRequestState, success: true }
      state.user = action.payload.user as iUser
      navigate('/dashboard')
    })

    builder.addCase(logoutAsync.pending, (state: AuthStateType) => {
      state.request = { ...baseRequestState, loading: true }
    })
    builder.addCase(logoutAsync.fulfilled, (state: AuthStateType) => {
      state.request = { ...baseRequestState, loading: true }
    })
  },
})

export default authSlice.reducer
