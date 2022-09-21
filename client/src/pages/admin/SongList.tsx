import React, {ChangeEvent, useEffect, useState} from 'react';
import InputGroup from "../../components/inputGroup/InputGroup";
import api from "../../axios";
import {BiPen, FiDelete} from "react-icons/all";
import {Link} from "react-router-dom";

const SongList = () => {
    
    const [songs, setSongs] = useState([])
    
    useEffect(()=>{
        api.get("api/v1/songs").then(({data, status})=>{
            if(status === 200){
                setSongs(data.songs)
            }
        })
    }, [])
    


    function handleDelete(id: number){
        api.delete("/api/v1/songs/"+id).then(({status})=>{
            if(status === 201){
                setSongs(songs.filter((a: any)=>a.songId !== id))
            }
        })
    }
    
    
    return (
        <div>
            <h1 className="">All Songs</h1>
            <div>
                { songs.map((ar: any)=>(
                    <div className="flex justify-between items-center">
                    <h4>{ar.title}</h4>
                    <div>
                        <Link to={`/admin/update-song/${ar.songId}`}><BiPen /></Link>
                        <FiDelete className="" onClick={()=>handleDelete(ar.songId)} />
                    </div>
                </div>
                )) }
            </div>
        </div>
    )
};

export default SongList;