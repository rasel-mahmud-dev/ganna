import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import api from "../../axios";

const SongDetail = (props) => {
    
    const params = useParams()
    
    useEffect(()=>{
    
        api.get(`/api/v1/songs/find-by-field?title=${params.title}`).then(({status, data})=>{
            console.log(params, data)
        })
        
        
    }, [params.title])
 
    return (
        <div className="container">
            <h1>{params.title}</h1>
        </div>
    );
};

export default SongDetail;