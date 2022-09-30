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

    const a = (
        <ul>
            <li className="slide animate">
                <a
                    className="_a default_bg"
                    aria-label="banner images"
                    href="/playlist/gaana-dj-hindi-workout-essentials"
                >
                    <picture>
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/dwN39y83DP/wN39agO3DP/size_l_1610733351.webp"
                            media="(min-width: 1420px)"
                        />
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/dwN39y83DP/wN39agO3DP/size_m_1610733351.webp"
                            media="(min-width: 992px)"
                        />
                        <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/dwN39y83DP/wN39agO3DP/size_s_1610733351.webp" />

                        <img
                            srcSet="https://a10.gaanacdn.com/images/showcase/1610733351_12677.jpg"
                            alt="Hindi Workout Essentials"
                            title="Hindi Workout Essentials"
                        />
                    </picture>
                </a>
            </li>
            <li className="slide animate">
                <a
                    className="_a default_bg"
                    aria-label="banner images"
                    href="/playlist/gaana-dj-workout-on-punjabi-beat"
                >
                    <picture>
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/ZaP374RWDy/ZaP372BKDy/size_l_1641541612.webp"
                            media="(min-width: 1420px)"
                        />
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/ZaP374RWDy/ZaP372BKDy/size_m_1641541612.webp"
                            media="(min-width: 992px)"
                        />
                        <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/ZaP374RWDy/ZaP372BKDy/size_s_1641541612.webp" />
                        <img
                            srcSet="https://a10.gaanacdn.com/images/showcase/1641541612_199.jpg"
                            alt="Workout Punjabi Beat"
                            title="Workout Punjabi Beat"
                        />
                    </picture>
                </a>
            </li>
            <li className="slide animate">
                <a className="_a default_bg" aria-label="banner images" href="/playlist/gaana-dj-new-indie-pop-hot-50">
                    <picture>
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/jBr3gLyWR1/Br3gm5QbR1/size_l_1662536030.webp"
                            media="(min-width: 1420px)"
                        />
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/jBr3gLyWR1/Br3gm5QbR1/size_m_1662536030.webp"
                            media="(min-width: 992px)"
                        />
                        <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/jBr3gLyWR1/Br3gm5QbR1/size_s_1662536030.webp" />
                        <img
                            srcSet="https://a10.gaanacdn.com/images/showcase/1662536030_13079.jpg"
                            alt="New Indie Releases"
                            title="New Indie Releases"
                        />
                    </picture>
                </a>
            </li>
            <li className="slide animate">
                <a
                    className="_a default_bg"
                    aria-label="banner images"
                    href="/playlist/gaana-dj-new-release-hot-20-punjabi"
                >
                    <picture>
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/XzVWRLKdqR/zVWRJ71Wdq/size_l_1658294455.webp"
                            media="(min-width: 1420px)"
                        />
                        <source
                            srcSet="https://a10.gaanacdn.com/gn_img/showcase/XzVWRLKdqR/zVWRJ71Wdq/size_m_1658294455.webp"
                            media="(min-width: 992px)"
                        />
                        <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/XzVWRLKdqR/zVWRJ71Wdq/size_s_1658294455.webp" />
                        <img
                            srcSet="https://a10.gaanacdn.com/images/showcase/1658294455_6713.jpg"
                            alt="New Releases Punjabi"
                            title="New Releases Punjabi"
                        />
                    </picture>
                </a>
            </li>
            <li className="slide animate">
                <a className="_a default_bg" aria-label="banner images" href="/playlist/gaana-dj-slow-romantic-hindi">
                    <div className="LazyLoad is-visible">
                        <picture>
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/MmqK5EKwRO/MmqK5XXbwR/size_l_1651817274.webp"
                                media="(min-width: 1420px)"
                            />
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/MmqK5EKwRO/MmqK5XXbwR/size_m_1651817274.webp"
                                media="(min-width: 992px)"
                            />
                            <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/MmqK5EKwRO/MmqK5XXbwR/size_s_1651817274.webp" />
                            <img
                                srcSet="https://a10.gaanacdn.com/images/showcase/1651817274_720.jpg"
                                alt="Slow Romantic Hindi"
                                title="Slow Romantic Hindi"
                            />
                        </picture>
                    </div>
                </a>
            </li>

            <li className="slide animate">
                <a className="_a default_bg" aria-label="banner images" href="/playlist/gaana-dj-best-of-a-p-dhillon">
                    <div className="LazyLoad is-visible">
                        <picture>
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/a7LWBkzbzX/7LWBBRDWzX/size_l_1657699648.webp"
                                media="(min-width: 1420px)"
                            />
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/a7LWBkzbzX/7LWBBRDWzX/size_m_1657699648.webp"
                                media="(min-width: 992px)"
                            />
                            <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/a7LWBkzbzX/7LWBBRDWzX/size_s_1657699648.webp" />
                            <img
                                srcSet="https://a10.gaanacdn.com/images/showcase/1657699648_13453.jpg"
                                alt="Best of A P Dhillon"
                                title="Best of A P Dhillon"
                            />
                        </picture>
                    </div>
                </a>
            </li>

            <li className="slide animate">
                <a className="_a default_bg" aria-label="banner images" href="/playlist/gaana-dj-sad-songs-hindi">
                    <div className="LazyLoad is-visible">
                        <picture>
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/81l3Me3rMx/1l3MZnPWrM/size_l_1651060182.webp"
                                media="(min-width: 1420px)"
                            />
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/81l3Me3rMx/1l3MZnPWrM/size_m_1651060182.webp"
                                media="(min-width: 992px)"
                            />
                            <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/81l3Me3rMx/1l3MZnPWrM/size_s_1651060182.webp" />
                            <img
                                srcSet="https://a10.gaanacdn.com/images/showcase/1651060182_5729.jpg"
                                alt="Heartbreak Hits"
                                title="Heartbreak Hits"
                            />
                        </picture>
                    </div>
                </a>
            </li>

            <li className="slide animate">
                <a className="_a default_bg" aria-label="banner images" href="/playlist/gaana-dj-big-hits-punjabi">
                    <div className="LazyLoad is-visible">
                        <picture>
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/qaLKY23pO4/qaLKYowWpO/size_l_1658294601.webp"
                                media="(min-width: 1420px)"
                            />
                            <source
                                srcSet="https://a10.gaanacdn.com/gn_img/showcase/qaLKY23pO4/qaLKYowWpO/size_m_1658294601.webp"
                                media="(min-width: 992px)"
                            />
                            <source srcSet="https://a10.gaanacdn.com/gn_img/showcase/qaLKY23pO4/qaLKYowWpO/size_s_1658294601.webp" />
                            <img
                                srcSet="https://a10.gaanacdn.com/images/showcase/1658294601_140.jpg"
                                alt="Big Hits - Punjabi"
                                title="Big Hits - Punjabi"
                            />
                        </picture>
                    </div>
                </a>
            </li>
        </ul>
    )

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
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    // scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}>
                >
                    {a.props.children.map((ch) => (
                        <SwiperSlide>{ch}</SwiperSlide>
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
