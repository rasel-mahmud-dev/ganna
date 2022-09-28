import React, {useEffect, useState} from 'react';
import api from "../../../axios";

const AlbumList = () => {
    
    const [albumList, setAlbumList]= useState([])
    
    useEffect(()=>{
        api.get("/api/v1/albums").then(({status, data})=>{
            if(status === 200){
                setAlbumList(data.albums)
            }
        })
    }, [])
    
    
    return (
        <div>
            { albumList.map((album)=>(
                <div>
                    <h4>{album.name}</h4>
                </div>
            )) }
            
        </div>
    );
};

export default AlbumList;