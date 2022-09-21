import React, {ChangeEvent, FC, useState} from 'react';
import InputGroup from "../../components/inputGroup/InputGroup";

const AddSong = () => {
    
    const [songData, setSongData] = useState({
        title: "",
    })
    
    function handleChange(e: React.SyntheticEvent){
        const ele = e.target as HTMLInputElement;
        setSongData({
            ...songData,
            [ele.name]: ele.value
        })
    }
    
    return (
        <div>
            
            <form action="">
                <h1>Add New Song</h1>
                <InputGroup data={songData} name="title" label="Song Title" placeholder="Enter song title" handleChange={handleChange} />
                <InputGroup data={songData} name="title" label="Song Title" placeholder="Enter song title" handleChange={handleChange} />
                <InputGroup data={songData} name="title" label="Song Title" placeholder="Enter song title" handleChange={handleChange} />
                <InputGroup data={songData} name="title" label="Song Title" placeholder="Enter song title" handleChange={handleChange} />
                <button className="btn btn-primary">Add Song</button>
            </form>
            
        </div>
    );
};

export default AddSong;