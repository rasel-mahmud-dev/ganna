import React, { SyntheticEvent, useEffect, useState } from "react";
import api from "../../../axios";
import Modal from "../../../components/modal/Modal";
import InputGroup from "../../../components/inputGroup/InputGroup";
import SelectGroup from "../../../components/selectGroup/SelectGroup";
import useStore from "../../../store/useStore";
import {ACTION_TYPES} from "../../../store/types";
import {fetchArtistsAction} from "../../../store/actions/artistAction";

const AlbumList = () => {
  const [{artists}, dispatch] = useStore()
  
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    api.get("/api/v1/albums").then(({ status, data }) => {
      if (status === 200) {
        setAlbumList(data.albums);
      }
    });
    
    if(artists) return;
    fetchArtistsAction(dispatch)
    
  }, []);

  const [state, setState] = useState({
    isUpdate: "",
    openForm: false,
  });

  const [data, setData] = useState({});

  function handleSubmit(e: SyntheticEvent) {}

  function handleChange(e) {
    e.preventDefault();
    
    
  }

  function addAlbumModal() {
    return (
      <Modal
        isOpen={state.openForm}
        onCloseModal={() => setState({ ...state, openForm: false })}
      >
        <div className="p-4">
          {state.openForm && (
            <form onSubmit={handleSubmit}>
              <h1>{state.isUpdate ? "Update Album" : "Add Album"}</h1>
              <InputGroup
                data={data}
                name="name"
                label="Album Name"
                placeholder="Enter Name"
                handleChange={handleChange}
              />
              <InputGroup
                data={data}
                name="cover"
                label="Album cover"
                placeholder="Enter album cover"
                handleChange={handleChange}
              />
              
              <SelectGroup
                  name="artistId"
                  dataLabel="name"
                  dataIndex="artistId"
                  multiple={true}
                  value={data.artistId}
                  label="select Artists"
                  placeholder="select Artist"
                  handleChange={handleChange}
                  renderOptions={(click) =>
                      artists.map((ite, index) => (
                          <li onClick={() => click(ite)}>{ite.name}</li>
                      ))
                  }
              />
              

              <button className="btn btn-primary">
                {state.isUpdate ? "Update" : "Add"}
              </button>
            </form>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mt-5">
        <h1 className="">Album list</h1>
        <button
          onClick={() => {
            setState({ ...state, isUpdate: "", openForm: true });
          }}
          className="btn btn-primary "
        >
          Add Album
        </button>
      </div>
      {state.openForm && addAlbumModal()}

      {albumList.map((album) => (
        <div>
          <h4>{album.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;