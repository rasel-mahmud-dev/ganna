import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import api from "../../axios";
import staticPath from "../../utils/staticPath";
import {CgHeart, FaHeart, FaPause, FaPlay, MdAlbum} from "react-icons/all";
import {ACTION_TYPES} from "../../store/types";
import useStore from "../../store/useStore";


const Details = (props) => {
    
    const [{isPlay}, dispatch] = useStore();
    
    const params = useParams();
    const [artistDetail, setArtistDetail] = useState({
        artist: null,
        songs: []
    })
    
    useEffect(()=>{
        
        if(params.name) {
            api.get("/api/v1/artists/details/" + params.name).then(response=>{
                if(response.status === 200){
                    setArtistDetail(response.data)
                }
            })
        }
    }, [params.name])
    
    
    function togglePlaySong(index?: number){
        dispatch({
            type: ACTION_TYPES.SET_PREPARE_PLAYLIST,
            payload: {
                playlistName: "Artist Song list",
                items: artistDetail.songs,
                playIndex: index ? index : 0,
            }
        })
    }
    
    return (
        <div>
        
            { artistDetail.artist && (
                <div className="artist-detail">
                   
                    <div className="flex artist-detail-info">
                        <div className="artist-photo">
                            <img className="" src={staticPath(artistDetail.artist.avatar)} />
                       </div>
                        
                        <div>
                            
                           
                            
                            <h2 className="artist-name">{artistDetail.artist.name}</h2>
                            <p className="artist-desc"> asperiores autem consequuntur dicta dolore doloribus, eos, excepturi molestias obcaecati, perferendis provident quam quidem sequi tempora veniam voluptas? Atque autem consectetur, cumque facere fuga iusto libero non porro quae unde, veritatis vitae. Aliquam animi fuga impedit maxime molestias repellendus sunt totam, unde. Ad blanditiis, dolore ea eaque enim eveniet in ipsa laudantium maxime neque quae quaerat ut voluptatem! Ab animi atque, autem beatae delectus dolore dolores earum eveniet ex, explicabo fugiat impedit in inventore ipsum maiores minus molestias, necessitatibus nesciunt nisi reiciendis rerum saepe sint tempore tenetur vitae voluptate voluptatem! Beatae cupiditate et fugiat, id in iste iure iusto laboriosam, laborum maxime necessitatibus obcaecati placeat praesentium qui quis reiciendis rem repellat? A commodi dolore ducimus earum enim, error explicabo fuga illum maiores maxime nam nisi obcaecati odit perspiciatis quas quidem rerum sequi soluta ut voluptatem. Accusamus amet assumenda autem doloremque eum fugit magni, officiis qui. Asperiores assumenda expedita quam tempora tempore. Amet consequuntur corporis cumque ea impedit iste magni quod rerum sed veritatis? Ea fugiat nisi quibusdam!</p>
                            <div className="flex items-center artist-meta">
                                <span className="flex items-center artist-meta-span ">
                                    {/*<FaHeart  />*/}
                                    <h4>Total {artistDetail.songs.length} songs</h4>
                                </span>
                                <span className="flex items-center artist-meta-span">
                                    <MdAlbum  />
                                    <h4>Total {artistDetail.songs.length} Album</h4>
                                </span>
                                 <span className="circle-icon">
                                <FaHeart className="" />
                            </span>
                                
                            </div>
                            
                            <button onClick={()=>togglePlaySong()} className="btn btn-primary play-all-btn flex items-center">
                                { isPlay ? (
                                    <>
                                        <FaPause className="mr-1" />
                                        Pause
                                    </>
                                ): (
                                    <>
                                        <FaPlay className="mr-1" />
                                        Play all
                                    </>
                                ) }
                            
                            </button>
                            
                        </div>
                    </div>
                    
                    
                    <div className="mt-10">
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th className="text-start">Track</th>
                                <th className="text-start">Artist</th>
                                <th className="text-start">Album</th>
                                <th className="text-start">Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                                { artistDetail.songs.map((song: any, index: number)=>(
                                    <tr>
                                        <td>
                                            <div className="flex items-center">
                                                <div className="relative cover-root">
                                                    <img src={staticPath(song.cover)} alt=""/>
                                                    <div className="circle-icon icon-in-cover" onClick={()=>togglePlaySong(index)}>
                                                        <FaPlay />
                                                    </div>
                                                </div>
                                                <span>{song.title}</span>
                                            </div>
                                        </td>
                                        <td>{song.artists}</td>
                                        <td>{song.albumId}</td>
                                        <td>{song.duration}</td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                        
                    </div>
                    
                </div>
            ) }
        </div>
    );
};

export default Details;
