import React from 'react'
import useAuth from '../../custom-hooks/useAuth'
import { Link } from '@reach/router'

const Layout = ({ children }: { children: any }) => {
  const [isAuth] = useAuth()
  return (
    <>
      <nav>
        {isAuth ? (
          <React.Fragment>
            <Link to='/' className='tw-p-2'>
              Geomusic
            </Link>
            <Link to='/search' className='tw-p-2'>
              Search
            </Link>
            <Link to='/playlists' className='tw-p-2'>
              My Music
            </Link>
            <button className='tw-p-2'>Logout</button>
          </React.Fragment>
        ) : null}
      </nav>
      <main>{children}</main>
    </>
  )
}

export default Layout
