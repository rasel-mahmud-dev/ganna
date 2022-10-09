import React from 'react'

import './style.scss'

const SongSkeleton = () => {
    return (
        <div className="skeleton">
            <div className="image-sketch "></div>
            <div className="text-sketch mt-1"></div>
            <div className="text-sketch"></div>
            <div className="text-sketch w-6/12"></div>
        </div>
    )
}

export default SongSkeleton
