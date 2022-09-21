import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from "react";
import InputGroup from "../../components/inputGroup/InputGroup";
import SelectGroup from "../../components/selectGroup/SelectGroup";
import api from "../../axios";

const AddSong = () => {
  
  const [songData, setSongData] = useState<any>({
      title: "",
      duration: "",
      categoryAlbum: "",
      albumId: "",
      artistId: [],
      cover: "",
  });
  
  const artists = [
      {artistId: 1, name: "Arjit sing"},
      {artistId: 2, name: "Jack knight"},
      {artistId: 3, name: "Jubin"},
      {artistId: 4, name: "KK"}
  ]
  
    useEffect(()=>{
        setTimeout(()=>{
            setSongData({
                ...songData,
                artistId: [
                    {artistId: 1, name: "Arjit sing"},
                    {artistId: 2, name: "Jack knight"},
                ]
            })
        }, 1000)
    }, [])

  function handleChange(e: React.SyntheticEvent) {
    const ele = e.target as HTMLInputElement;
    setSongData({
      ...songData,
      [ele.name]: ele.value,
    });
  }
  
  function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        // let errorMessage = ""
        // let dataKey: keyof {email: string, name: string, avatar: string};
        //
        // for (dataKey in data) {
        //     if(!data[dataKey]){
        //         errorMessage = dataKey + " required"
        //     }
        // }
        //
        // if(errorMessage){
        //     alert(errorMessage)
        //     return;
        // }
        //
        // api.post("/api/v1/admin/add-artist", data).then((response)=>{
        //     console.log(response)
        // }).catch(ex=>{
        //     console.log(ex)
        // })
        //
        //
        // console.log("Ok")
        
    }
    
    
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add New Song</h1>
        <InputGroup
          data={songData}
          name="title"
          label="Song Title"
          placeholder="Enter song title"
          handleChange={handleChange}
        />
        <InputGroup
          data={songData}
          name="cover"
          label="Song cover"
          placeholder="Enter cover link"
          handleChange={handleChange}
        />
        <InputGroup
          data={songData}
          type="number"
          name="duration"
          label="Song Duration"
          placeholder="Enter song duration"
          handleChange={handleChange}
        />
        <InputGroup
          data={songData}
          name="title"
          label="Song Title"
          placeholder="Enter song title"
          handleChange={handleChange}
        />
        <SelectGroup
          name="artistId"
          dataLabel="name"
          dataIndex="artistId"
          multiple={true}
          value={songData.artistId}
          label="select Artist"
          placeholder="select Artist"
          handleChange={handleChange}
          renderOptions={(click)=> artists.map((ite, index)=>(
              <li onClick={()=>click(ite)}>{ite.name}</li>
          )) }
        />
        
        
       <InputGroup
           data={songData}
           name="title"
           label="Song Title"
           placeholder="Enter song title"
           handleChange={handleChange}
       />
      
       <InputGroup
           data={songData}
           name="title"
           label="Song Title"
           placeholder="Enter song title"
           handleChange={handleChange}
       />
        
        <button className="btn btn-primary">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;