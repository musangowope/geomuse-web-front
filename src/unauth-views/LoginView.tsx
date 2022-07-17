import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useSelector } from 'react-redux'
import { loginAsync, iLoginPayload } from '../redux/slices/authSlice'
import { iReduxState, useAppDispatch } from '../redux/store'

const LoginView = ({}: RouteComponentProps) => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })
  const { request } = useSelector((state: iReduxState) => state.auth)
  const dispatch = useAppDispatch()

  const onInputChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(loginAsync(formData as iLoginPayload))
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Username
        <input type='text' name='username' onChange={onInputChange} required />
      </label>
      <label>
        Password
        <input type='password' name='password' onChange={onInputChange} required />
      </label>
      <button type='submit'>Login</button>
      {request.loading ? <div>Loading</div> : null}
    </form>
  )
}

export default LoginView
