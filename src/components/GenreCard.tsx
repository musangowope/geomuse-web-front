import React from 'react'

interface iGenreCard extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
}

const GenreCard = ({ title = '', ...props }: iGenreCard) => {
  return (
    <button {...props} type='button' className='genre-card'>
      {title}
    </button>
  )
}

export default GenreCard
