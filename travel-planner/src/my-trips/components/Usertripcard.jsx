import React from 'react'

const Usertripcard = ({trip}) => {
  return (
    <div className='hover:scale-105 transition-all'>
        <img src="https://media.gettyimages.com/id/1445528561/photo/aerial-view-of-man-and-woman-raising-holding-arms-in-mountains-in-norway.jpg?s=612x612&w=0&k=20&c=VDSc8ZcP8xHK-3KnjlKZ2x6SbtnRAwEM92p7jMjqGH4=" alt="" className='object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userselection?.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userselection?.days}Days trip with {trip?.userselection?.budget} Budget</h2>
        </div>
    </div>
  )
}

export default Usertripcard