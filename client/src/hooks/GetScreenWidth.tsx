import React, { useEffect, useState } from 'react'

const GetScreenWidth = (HOC: any) => {
    return function (props: any) {
        const [screenWidth, setScreenWidth] = useState(window.innerWidth)
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        useEffect(() => {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [])

        return (
            <div>
                <HOC {...props} screenWidth={screenWidth} />
            </div>
        )
    }
}

export default GetScreenWidth
