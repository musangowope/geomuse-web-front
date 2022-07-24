import React from 'react'

type PreviewType = {
  name?: string
  image?: string
  numberOfSongs?: number
}

const PlaylistPreview = ({ name = '', image = '', numberOfSongs = 0 }: PreviewType) => {
  return (
    <div>
      <div>{image}</div>
      <div>{name}</div>
      <div>{numberOfSongs} number of songs</div>
    </div>
  )
}

export default PlaylistPreview
