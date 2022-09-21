import React, {ChangeEvent, useEffect, useState} from 'react';
import InputGroup from "../../components/inputGroup/InputGroup";

const ArtistList = () => {
    
    const [artist, setArtist] = useState([])
    
    const [data, setData] = useState({
        name: "",
        email: "",
        avatar: ""
    })
    
    useEffect(()=>{}, [])
    
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
    
    
    return (
        <div>
            {addArtistModal()}
        </div>
    )
};

export default ArtistList;