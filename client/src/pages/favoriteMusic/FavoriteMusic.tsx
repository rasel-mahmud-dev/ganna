import React, {useEffect, useState} from 'react';
import api from "../../axios";
import staticPath from "../../utils/staticPath";

import "./style.scss"
import {ACTION_TYPES} from "../../store/types";
import useStore from "../../store/useStore";

const FavoriteMusic = () => {
    
    const [_, dispatch]  = useStore()
    
    const [favorites, setFavorites] = useState([])
    
    useEffect(()=>{
        api.get("/api/v1/favorite/all").then(({status, data})=>{
            setFavorites(data.favorites)
        })
    }, [])
    
    
    function handlePlayPrepare(song: any, list: any){
        let playlistName = "Favorites"
        
        dispatch({
            type: ACTION_TYPES.SET_PREPARE_PLAYLIST,
            payload: {
                items: list,
                playlistName,
            }
        })
    }
    
    return (
        <div className="container">
        
            <div>
                <h3>Favorite list</h3>
                
                <table className="favorite-table">
                    <thead>
                    <tr>
                        <th>Track</th>
                        <th className="text-start">Artist</th>
                        <th className="text-start">Duration</th>
                    </tr>
                    </thead>
                    <tbody>
                       { favorites.map((fav: any)=>(
                           <tr className="tr">
                              <td>
                                   <div className="flex items-center" onClick={()=>handlePlayPrepare(fav, favorites)}>
                                        <img src={staticPath(fav.cover)} />
                                        <p className="track ml-4">{fav.title}</p>
                                   </div>
                              </td>
                               <td>    <p className="track">{fav.title}</p></td>
                               <td>
                                   <div className="track">
                                        {fav.duration }
                                    </div>
                               </td>
                            </tr>
                       )) }
                    </tbody>
                </table>
                
            </div>
        </div>
    );
};

export default FavoriteMusic;