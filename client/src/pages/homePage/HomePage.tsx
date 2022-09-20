import React from 'react';


const HomePage = () => {
    
    const items = [
        {name: "All"},
        {name: "Trending Songs"},
        {name: "New Songs"},
        {name: "Old Songs"},
        {name: "Album"},
        {name:  "Moods & Genres", sub: [
                "Moods & Genres",
                "Party",
                "Romance",
                "90s & 2000s",
                "Retro",
                "Indie",
                "Bhakti",
                "EDM",
                "Ghazals",
                "Workout",
                "Stars",
                "Wedding",
                "Kids",
                "Dance",
                "Friendship",
            
            ]},
        {name: "Radio"},
        {name: "Podcast"},
        {name: "My Music"},
    ]
    
    const [activeCat, setActiveCat] = React.useState("All")
    
    function changeCategory(item: {name: string}){
       setActiveCat(item.name)
    }
    
    const sections = [
        { label: "Trending Songs" },
        { label: "New Releases" },
        { label: "Top Charts" },
        { label: "Top Searched Artists" },
        { label: "Top Playlists" },
        { label: "Popular In Hindi" }
    ]
    
    
    
    
    return (
        <div className="container">
           <ul className="flex item-category">
               {items.map((item=>(
                   <li onClick={()=>changeCategory(item)} className={`${activeCat === item.name ? "active" : ""}`}>{item.name}</li>
               )))}
           </ul>
    
    
            { sections.map(section=>(
                <div className="section">
                    <h3 className='section-name'>{section.label}</h3>
                    <div className="flex song-list">
                        { new Array(10).fill(1).map(a=>(
                            <div className="song-item">
                                <img src="https://a10.gaanacdn.com/gn_img/albums/ZaP37RKDy7/P37OlNeX3D/size_m.webp" alt="Pani Di Gal" title="Pani Di Gal" />
                                <p className="song-name">Phele mera pair</p>
                            </div>
                        )) }
                    </div>
                </div>
            )) }
            
            
  </div>
    );
};

export default HomePage;