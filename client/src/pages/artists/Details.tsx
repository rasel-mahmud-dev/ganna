import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../../axios";
import staticPath from "../../utils/staticPath";


const Details = (props) => {
    
    const params = useParams();
    const [artistDetail, setArtistDetail] = useState({
        artist: null,
        songs: []
    })
    
    useEffect(()=>{
        
        if(params.name) {
            api.get("/api/v1/artists/details/" + params.name).then(response=>{
                if(response.status === 200){
                    setArtistDetail(response.data)
                }
            })
        }
    }, [params.name])
    
    
    return (
        <div>
        
            { artistDetail.artist && (
                <div>
                    <img src={staticPath(artistDetail.artist.avatar)} />
                    <h1>{artistDetail.artist.name}</h1>
                    
                    
                    
                    <div className="mt-10">
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th className="text-start">Track</th>
                                <th className="text-start">Artist</th>
                                <th className="text-start">Album</th>
                                <th className="text-start">Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                                { artistDetail.songs.map(song=>(
                                    <tr>
                                        <td>
                                            <div className="flex items-center">
                                                <img src={staticPath(song.cover)} alt=""/>
                                                <span>{song.title}</span>
                                            </div>
                                        </td>
                                        <td>{song.artists}</td>
                                        <td>{song.albumId}</td>
                                        <td>{song.duration}</td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                        
                    </div>
                    
                </div>
            ) }
        </div>
    );
};

export default Details;
