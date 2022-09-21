import React, {ChangeEvent, useEffect, useState} from 'react';
import InputGroup from "../../components/inputGroup/InputGroup";
import api from "../../axios";
import {FiDelete} from "react-icons/all";

const ArtistList = () => {
    
    const [artist, setArtist] = useState([])
    
    const [data, setData] = useState({
        name: "",
        email: "",
        avatar: ""
    })
    
    useEffect(()=>{
        api.get("api/v1/artists").then(({data, status})=>{
            if(status === 200){
                setArtist(data.artists)
            }
        })
    }, [])
    
    function handleChange(e: ChangeEvent){
        let el = e.target as HTMLInputElement
        setData({
            ...data,
            [el.name]: el.value
        })
    }
    
    
    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        let errorMessage = ""
        let dataKey: keyof {email: string, name: string, avatar: string};
    
        for (dataKey in data) {
            if(!data[dataKey]){
                errorMessage = dataKey + " required"
            }
        }
    
        if(errorMessage){
            alert(errorMessage)
            return;
        }
        
        api.post("/api/v1/artists/add-artist", data).then(({status, data})=>{
            if(status === 201){
            
            }
        }).catch(ex=>{
            console.log(ex)
        })
        
        
        console.log("Ok")
        
    }
    
    function addArtistModal(){
        return (
            <div>
            <form onSubmit={handleSubmit}>
        <h1>Add Artist</h1>
        <InputGroup
            data={data}
            name="name"
            label="Name"
            placeholder="Enter Name"
            handleChange={handleChange}
        />
        <InputGroup
            type="email"
            data={data}
            name="email"
            label="Artist email"
            placeholder="Artist email"
            handleChange={handleChange}
        />
        <InputGroup
            data={data}
            name="avatar"
            label="Artist avatar"
            placeholder="Enter avatar link"
            handleChange={handleChange}
        />
        
        <button className="btn btn-primary">Add Artist</button>
      </form>
        </div>
        );
    }
    
    function handleDelete(id: number){
        api.delete("/api/v1/artists/"+id).then(({status})=>{
            if(status === 201){
                setArtist(artist.filter((a: any)=>a.artistId !== id))
            }
        })
    }
    
    
    return (
        <div>
            { artist.map((ar: any)=>(
                <div className="flex justify-between items-center">
                    <h4>{ar.name}</h4>
                    <FiDelete className="" onClick={()=>handleDelete(ar.artistId)} />
                </div>
            )) }
            {addArtistModal()}
        </div>
    )
};

export default ArtistList;