import { useSelector } from 'react-redux'
import { iReduxState } from '../redux/store'
import { iUser } from '../redux/slices/authSlice'

const useAuth = (): [boolean, iUser] => {
  const { user } = useSelector((state: iReduxState) => state.auth)
  return [!!user.jwt, user]
}

export default useAuth
