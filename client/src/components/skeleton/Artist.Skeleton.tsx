import React from 'react'

import './style.scss'

const ArtistSkeleton = () => {
    return (
        <div className="skeleton artist-skeleton">
            <div className="image-sketch"></div>
            <div className="text-sketch w-full mx-auto mt-2"></div>
            <div className="text-sketch w-11/12 mx-auto mt-1"></div>
        </div>
    )
}

export default ArtistSkeleton
