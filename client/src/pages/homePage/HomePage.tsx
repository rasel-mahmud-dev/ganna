import React, { useEffect, useState } from 'react'
import staticPath from '../../utils/staticPath'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import api from '../../axios'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const items = [
        { name: 'All' },
        { name: 'Trending Songs' },
        { name: 'New Songs' },
        { name: 'Old Songs' },
        { name: 'Album' },
        {
            name: 'Moods & Genres',
            sub: [
                'Moods & Genres',
                'Party',
                'Romance',
                '90s & 2000s',
                'Retro',
                'Indie',
                'Bhakti',
                'EDM',
                'Ghazals',
                'Workout',
                'Stars',
                'Wedding',
                'Kids',
                'Dance',
                'Friendship',
            ],
        },
        { name: 'Radio' },
        { name: 'Podcast' },
        { name: 'My Music' },
    ]

    function renderItem(str: string, data: any[]) {
        switch (str) {
            case 'Trending Songs':
            case 'New Releases':
                return (
                    <div className="flex  song-list flex-wrap">
                        {data &&
                            data.map((a) => (
                                <Link to={`/song/${a.title}`}>
                                    <div className="song-item ">
                                        <div className="card">
                                            <img src={staticPath(a.cover)} alt="Pani Di Gal" title="Pani Di Gal" />
                                        </div>
                                        <p className="song-name">{a.title}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                )

            case 'Top Searched Artists':
                return (
                    <div className="flex gap-25 flex-wrap">
                        {data &&
                            data.map((a) => (
                                <Link to={`artists/${a.name}`}>
                                    <div className="artist-item">
                                        <div className="artist-image cursor-pointer">
                                            <img
                                                className="w-full"
                                                src={staticPath(a.avatar)}
                                                alt="Pani Di Gal"
                                                title="Pani Di Gal"
                                            />
                                        </div>
                                        <p className="song-name cursor-pointer text-center">{a.name}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                )

            default:
                return ''
        }
    }
    const sections = [
        { label: 'Trending Songs', filterBy: 'hit_songs' },
        { label: 'New Releases', filterBy: 'createdAt' },
        // { label: "Top Charts" },
        { label: 'Top Searched Artists', filterBy: 'hit_artists' },
        { label: 'Top Playlists', filterBy: 'view_playlist' },
        { label: 'Popular In Hindi' },
    ]
    const [sectionData, setSectionData] = useState({})

    useEffect(() => {
        api.post('/api/v1/songs/filter', { filter: sections })
            .then((res) => {
                if (res.status === 200) {
                    setSectionData(res.data.result)
                }
            })
            .catch((ex) => {
                console.log(ex)
            })
    }, [])

    const [activeCat, setActiveCat] = React.useState('All')

    function changeCategory(item: { name: string }) {
        setActiveCat(item.name)
    }

    const a = [
        { cover: 'cover/size_l_1641541612.webp' },
        { cover: 'cover/size_l_1657699648.webp' },
        { cover: 'cover/size_l_1658294455.webp' },
        { cover: 'cover/size_l_1662536030.webp' },
        { cover: 'cover/size_l_1663939695.webp' },
        { cover: 'cover/size_l_1664259579.webp' },
    ]
    return (
        <div className="container">
            <ul className="flex item-category ">
                {items.map((item) => (
                    <li onClick={() => changeCategory(item)} className={`${activeCat === item.name ? 'active' : ''}`}>
                        {item.name}
                    </li>
                ))}
            </ul>

            <div className="home-slider mt-2">
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, A11y]}
                    spaceBetween={0}
                    breakpoints={{
                        1200: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                    }}
                    slidesPerView={1}
                    navigation
                    // scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}>
                >
                    {a.map((ch) => (
                        <SwiperSlide>
                            <div>
                                <img className="w-full" src={staticPath(ch.cover)} alt="" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {sections.map((section) => (
                <div className="section">
                    <h3 className="section-name mb-2">{section.label}</h3>
                    {/*<div className="flex song-list">*/}
                    {renderItem(section.label, sectionData[section.label])}
                    {/*</div>*/}
                </div>
            ))}
        </div>
    )
}

export default HomePage
