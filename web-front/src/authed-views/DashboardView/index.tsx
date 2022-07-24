import React from 'react'
import { RouteComponentProps, useLocation } from '@reach/router'
import MusicMap from '../../components/redux-components/MusicMap'
import { useAppDispatch } from '../../redux/store'
import { getPlaylistsAsync } from '../../redux/slices/playlistsSlice'

type DashboardViewType = RouteComponentProps & {
  children: any
}

const DashboardView = ({ children }: DashboardViewType) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(getPlaylistsAsync())
  }, [dispatch])

  const renderChildren = location.pathname !== '/'
  return (
    <div className='tw-relative tw-h-full'>
      <MusicMap />
      {renderChildren ? (
        <div className='tw-absolute tw-top-0 tw-left-0 tw-h-full tw-w-full'>{children}</div>
      ) : null}
    </div>
  )
}

export default DashboardView
