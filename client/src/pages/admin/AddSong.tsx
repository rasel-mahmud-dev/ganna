import React, {
  useEffect,
  useState,
} from "react";

import InputGroup from "../../components/inputGroup/InputGroup";
import SelectGroup from "../../components/selectGroup/SelectGroup";
import api from "../../axios";
import {useParams} from "react-router-dom";


const AddSong = () => {

  const params = useParams()
  
  const [songDetail, setSongDetail] = useState(null);
  const [songData, setSongData] = useState<any>({
    title: "Text",
    duration: 3.30,
    categoryAlbumId: [], // multiple ids
    artistId: [],  // multiple ids
    albumId: [ ],
    genreId: [],
    url: "sad",
    cover: "34",
  });
  
  const [artists, setArtist] = React.useState([])
  const albums = [
    { albumId: 1, name: "Chorodini Tumi je amar" },
    { albumId: 2, name: "Dil Ko Karaar Aaya (Reprise)" },
    { albumId: 3, name: "Jubin" },
    { albumId: 4, name: "KK" },
  ];
  const categoryAlbums = [
    { categoryAlbumId: 1, name: "Bangla" },
    { categoryAlbumId: 2, name: "English" },
    { categoryAlbumId: 3, name: "Hindy" },
    { categoryAlbumId: 4, name: "KK" },
  ];
  const genres = [
    { genreId: 1, name: "FOLK" },
    { genreId: 2, name: "BAUI" },
    { genreId: 3, name: "MURSHID" },
    { genreId: 4, name: "ROCK" },
  ];
  
  
  useEffect(() => {
    
    (async function(){
      
      api.get("/api/v1/artists").then(({status, data})=>{
        if(status !== 200){
          return;
        }
        setArtist(data.artists)
      })
  
      // api.get("/api/v1/genres").then(({status, data})=>{
      //   if(status !== 200){
      //     return;
      //   }
      //   setArtist(data.artists)
      // })
  
      
      
    }())
    
  }, []);
  
  useEffect(() => {
    
    (async function(){
      if(!params.id) return
      const {status, data} = await api.get("/api/v1/songs/"+params.id)
      if(status !== 200){
        return;
      }
      let item = data.song;
      setSongDetail(item)
      let findGenreId = genres.find(g=> item.genreId == g.genreId )
      let findAlbumId = albums.find(g=> item.albumId == g.albumId )
  
      setSongData({
        ...songData,
        title: item.title,
        duration: item.duration,
        // categoryAlbumId: item.categoryAlbumId,
        // artistId: item.artistId,
        albumId: [findAlbumId],
        genreId: [findGenreId],
        url: item.url,
        cover: item.cover
      })
    }())
    
  }, [params.id]);
  
  
  useEffect(() => {
    if(songDetail) {
   
      let findAlbumIds = artists.filter(g => songDetail.artistId.includes(g.artistId))
      let categoryAlbumId = categoryAlbums.filter(g => songDetail.categoryAlbumId.includes(g.categoryAlbumId))
      
      setSongData({
        ...songData,
        categoryAlbumId: categoryAlbumId,
        artistId: findAlbumIds,
      })
    }
  }, [artists, songDetail]);
  
  
  function handleChange(e: React.SyntheticEvent) {
    const ele = e.target as HTMLInputElement;
    setSongData({
      ...songData,
      [ele.name]: ele.value,
    });
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    let errorMessage = "";
    let songDataKey: any;

    let payload: any = {}
    
    for (songDataKey in songData) {
      if(songDataKey === "genreId" || songDataKey === "albumId"){
        // this are store single id;
        if(songData[songDataKey] && songData[songDataKey].length) {
          
          payload[songDataKey] = songData[songDataKey].map((val: any)=>val[songDataKey])
          
        }  else {
          errorMessage = songDataKey + " required";
        }
        
      } else if(songDataKey === "categoryAlbumId" || songDataKey === "artistId") {
        // this are store multiple ids;
        if(songData[songDataKey] && songData[songDataKey].length) {
          payload[songDataKey] = songData[songDataKey].map((val: any) => val[songDataKey])
        } else {
          errorMessage = songDataKey + " required";
        }
        
      } else {
          if (!songData[songDataKey]) {
            errorMessage = songDataKey + " required";
          } else {
            payload[songDataKey] = songData[songDataKey]
          }
        }
      }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }
  
    if(params.id){
    //  update song
  
      api
      .patch("/api/v1/songs/"+params.id, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((ex) => {
        console.log(ex);
      });
      
      console.log(payload)
      
    
    } else {
      api
      .post("/api/v1/songs", payload)
      .then((response) => {
        console.log(response);
      })
      .catch((ex) => {
        console.log(ex);
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{params.id ? "Update Song" : "Add New Song"}</h1>
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
   
        
         <SelectGroup
             name="genreId"
             dataLabel="name"
             dataIndex="genreId"
             value={songData.genreId}
             label="select genreId"
             placeholder="select genreId"
             handleChange={handleChange}
             renderOptions={(click) =>
                 genres.map((ite, index) => (
                     <li onClick={() => click(ite)}>{ite.name}</li>
                 ))
             }
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
          renderOptions={(click) =>
            artists.map((ite, index) => (
              <li onClick={() => click(ite)}>{ite.name}</li>
            ))
          }
        />

        <SelectGroup
          name="categoryAlbumId"
          dataLabel="name"
          dataIndex="categoryAlbumId"
          value={songData.categoryAlbumId}
          label="select categoryAlbumId"
          placeholder="select categoryAlbumId"
          handleChange={handleChange}
          renderOptions={(click) =>
              categoryAlbums.map((ite) => <li onClick={() => click(ite)}>{ite.name}</li>)
          }
        />

        <SelectGroup
          name="albumId"
          dataLabel="name"
          dataIndex="albumId"
          value={songData.albumId}
          label="select albumId"
          placeholder="select albumId"
          handleChange={handleChange}
          renderOptions={(click) =>
            albums.map((ite) => <li onClick={() => click(ite)}>{ite.name}</li>)
          }
        />

        <InputGroup
          data={songData}
          name="url"
          label="Song URL"
          placeholder="Enter song url"
          handleChange={handleChange}
        />

        <button className="btn btn-primary">{params.id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default AddSong;
