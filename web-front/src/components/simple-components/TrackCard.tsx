import React from 'react'
import { TrackType } from '../../redux/slices/playlistsSlice'

interface iTrackCardProps extends TrackType {
  onMenuClick?: () => void
}

const TrackCard = ({
  image = '',
  name = '',
  artist = '',
  onMenuClick = () => false,
}: // onArtistNameClick = () => false,
iTrackCardProps) => {
  return (
    <div className='track-card'>
      <img src={image} alt={artist} />
      <div className='track-card__info'>
        <div className='track-card__info__heading'>{name}</div>
        <div className='track-card__info__subheading'>{artist}</div>
      </div>
      <button
        className='tw-bg-fuchsia-800 tw-text-white tw-p-2'
        type='button'
        onClick={onMenuClick}
      >
        Add track
      </button>
    </div>
  )
}

export default TrackCard
