import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
    const sections = [
        {
            Albums: [
                'English',
                'Hindi',
                'Telugu',
                'Punjabi',
                'Tamil',
                'Kannada',
                'Bhojpuri',
                'Malayalam',
                'Marathi',
                'Bengali',
                'Gujarati Songs',
                'Haryanvi',
                'View al',
            ],
        },
        {
            Genres: [
                'Bollywood Songs',
                'Devotional Songs',
                'Ghazals',
                'Bhajan',
                'Patriotic Songs',
                'Kids Songs',
                'Rock Songs',
                'Disco Songs',
                'Sufi Songs',
                'Love Songs',
                'View all',
            ],
        },
        {
            Artists: [
                { to: '/artists/', name: 'Arijit Singh' },
                { to: '/artists/', name: 'Neha Kakkar' },
                { to: '/artists/', name: 'Honey Singh' },
                { to: '/artists/', name: 'Atif Aslam' },
                { to: '/artists/', name: 'A R Rahman' },
                { to: '/artists/', name: 'Lata Mangeshkar' },
                { to: '/artists/', name: 'Kishore Kumar' },
                { to: '/artists/', name: 'Armaan Malik' },
                { to: '/artists/', name: 'Sunidhi Chauhan' },
                { to: '/artists/', name: 'Nusrat Fateh Ali Khan' },
                { to: '/artists/', name: 'Mohammed Rafi' },
                { to: '/artists/', name: 'Guru Randhawa' },
                { to: '/artists/', name: 'Justin Bieber' },
                { to: '/artists/', name: 'BTS' },
                { to: '/artists/', name: 'View all' },
            ],
        },
        {
            'New Release': [
                'English Songs',
                'Hindi Songs',
                'Punjabi Songs',
                'Tamil Songs',
                'Telugu Songs',
                'Kannada Songs',
                'Bhojpuri Songs',
                'Malayalam Songs',
                'Marathi Songs',
                'Bengali Songs',
                'Odia Songs',
                'Urdu Songs',
                'Rajasthani Songs',
                'Assamese Songs',
                'Haryanvi Songs',
                'View all',
            ],
        },
        // {
        //     'Trending Albums': [
        //         "Happy Birthday Songs",
        //         "Sad Songs",
        //         "PK Songs",
        //         "Jersey",
        //         "Bunty Aur Babli 2",
        //         "Chandigarh Kare Aashiqui",
        //         "Sooryavanshi",
        //         "Dhamaka",
        //         "Gaming Music",
        //         "Atrangi Re",
        //         "Radhe Shyam",
        //         "Master Tamil",
        //         "Pushpa The Rise",
        //         "Uppena",
        //         "Enemy Tamil",
        //         "View all",
        //     ]
        // }
    ]

    return (
        <footer className="footer">
            <div className="container">
                <h1 className="text-center title mt-10">Listen free unlimited music in Gungun</h1>
                <p className="text-center desc">
                    Gungun is the one-stop solution for all your music needs. Gungun offers you free, unlimited access
                    to over 30 million Hindi Songs, Bollywood Music, English MP3 songs, Regional Music & Mirchi Play.
                </p>
                <div className="border-b"></div>

                <div className="footer-category-list mt-5">
                    {sections.map((section: any) => (
                        <div className="flex">
                            {Object.keys(section).map((key: any) => (
                                <div>
                                    <span className="list-label">{key}</span>
                                    {section[key]?.map((item: any) => (
                                        <div>
                                            <span className="list-item">
                                                {key === 'Artists' ? (
                                                    <Link to={item.to + item.name}>{item.name}</Link>
                                                ) : (
                                                    item
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
