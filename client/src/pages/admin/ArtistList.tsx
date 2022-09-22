import React, { ChangeEvent, useEffect, useState } from "react";
import InputGroup from "../../components/inputGroup/InputGroup";
import api from "../../axios";
import {BiPen, BsPen, BsPencil, CgPen, FaPen, FiDelete, FiEdit, TiPen} from "react-icons/all";
import Modal from "../../components/modal/Modal";

const ArtistList = () => {
  const [artist, setArtist] = useState([]);

  const [data, setData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const [isOpenModal, setOpenModal] = useState(false);
  const [updateArtist, setUpdateArtist] = useState(null);

  useEffect(() => {
    api.get("api/v1/artists").then(({ data, status }) => {
      if (status === 200) {
        setArtist(data.artists);
      }
    });
  }, []);
  
  
  function handleOpenUpdateForm(ar: any) {
    setOpenModal(true)
    setUpdateArtist(ar)
    let updateDate = {...data}
    let updateDateKey: keyof typeof updateDate
    for (updateDateKey in updateDate) {
      if(ar[updateDateKey]){
        updateDate[updateDateKey] = ar[updateDateKey];
      }
    }
    setData(updateDate)
  }
  
  
  function handleChange(e: ChangeEvent) {
    let el = e.target as HTMLInputElement;
    setData({
      ...data,
      [el.name]: el.value,
    });
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    let errorMessage = "";
    let dataKey: keyof { email: string; name: string; avatar: string };

    for (dataKey in data) {
      if (!data[dataKey]) {
        errorMessage = dataKey + " required";
      }
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    if(updateArtist) {
      api
      .patch("/api/v1/artists/"+updateArtist?.artistId as any, data)
      .then(({status, data}) => {
        if (status === 201) {
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
    } else {
      api
      .post("/api/v1/artists/add-artist", data)
      .then(({status, data}) => {
        if (status === 201) {
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
    }
    
    console.log("Ok");
  }

  function addArtistModal() {
    return (
      <Modal isOpen={isOpenModal} onCloseModal={() => setOpenModal(false)}>
        <div>
          {isOpenModal && (
            <form onSubmit={handleSubmit}>
              <h1>{updateArtist ? "Update Artist" : "Add Artist" }</h1>
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

              <button className="btn btn-primary">{ updateArtist ? "Update" : "Add"}</button>
            </form>
          )}
        </div>
      </Modal>
    );
  }

  function handleDelete(id: number) {
    api.delete("/api/v1/artists/" + id).then(({ status }) => {
      if (status === 201) {
        setArtist(artist.filter((a: any) => a.artistId !== id));
      }
    });
  }

  
  return (
    <div>
      
      <h1>Artist List</h1>
      <button onClick={()=> {setUpdateArtist(null); setOpenModal(true)}} className="btn btn-primary ">Add Artist</button>
      
      {artist.map((ar: any) => (
        <div className="flex justify-between items-center">
          <h4>{ar.name}</h4>
          <div>
            <FiEdit onClick={()=>handleOpenUpdateForm(ar)} />
            <FiDelete className="" onClick={() => handleDelete(ar.artistId)} />
          </div>
        </div>
      ))}
      {addArtistModal()}
    </div>
  );
};

export default ArtistList;
