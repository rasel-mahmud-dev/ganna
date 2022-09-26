import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import api from "../../axios";


const Details = (props) => {
    
    const params = useParams();
    
    
    useEffect(()=>{
        
        if(params.name) {
            api.get("/api/v1/artists/details/" + params.name).then(response=>{
                console.log(response)
            })
        }
    }, [params.name])
    
    
    return (
        <div>
          <h1>{params.name}</h1>
        </div>
    );
};

export default Details;
