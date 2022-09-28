import React, {SyntheticEvent, useEffect, useState} from "react";

import "./style.scss";
import {BiUser} from "react-icons/all";
import {Link, useLocation} from "react-router-dom";
import staticPath from "../../utils/staticPath";

const LeftSidebar = (props) => {
    
    const location = useLocation();
    
    const {isOpenLeftSidebar,  auth, onClose} = props;
    const [isAdminRoute, setAdminRoute] = useState(false)
    
    useEffect(()=>{
        if(location.pathname.includes("/admin/")){
            setAdminRoute(true)
        } else {
            setAdminRoute(false)
        }
    }, [location.pathname])
    
    function clickOnBackdrop(e: SyntheticEvent){
        let el = e.target as HTMLDivElement
        if(el.classList.contains("left-sidebar__backdrop")){
            onClose()
        }
    }
    
    const q = [
        {label: "Trending Songs", to: ""},
        {label: "New Songs", to: ""},
        {label: "Old Songs", to: ""},
        {label: "Album", to: "/albums"},
        {label: "Artist", to: "/artists"},
        {label: "Top Playlist", to: "/playlist"},
        {label: "Music Labels", to: ""},
        {label: "Genres", to: "/genres"}
    ]
    
    const adminItems = [
        {label: "Songs", to: "/admin/songs"},
        {label: "Add Songs", to: "/admin/add-songs"},
        {label: "Genres", to: "/admin/genres"},
        {label: "Album", to: "/admin/albums"},
        {label: "Artist", to: "/admin/artist"},
    ]
  
  return  (
    <div>
      <div className="left-sidebar__backdrop" onClick={clickOnBackdrop}></div>
        <div className="left-sidebar">
            
             <div className="sidebar-content">
          
          <div className="first-section">
              { auth ? (
                  <div>
                      <img className="sidebar-avatar" src={staticPath(auth.avatar)} alt=""/>
                      <h4 className='text-center'>{auth.username}</h4>
                  </div>
              ) : (
    
                  <div className="flex items-center">
                  <BiUser />
                  <h4 className="label">Login / Sign Up</h4>
              </div>

              ) }
          </div>
          
          <div className="items-center section">
              { isAdminRoute && auth && (
                  adminItems.map(item=>(
                      <div>
                      <li className="section-item">
                          <Link to={item.to}> {item.label}</Link>
                      </li>
                  </div>
                  ))
              ) }
          </div>
          
          <div className="flex items-center border-b section">
             <div>
                 <h4>Music</h4>
                 <li className="section-item"><Link to="/playlist">Playlist</Link></li>
                 <li className="section-item"><Link to="/favorite">Favorite</Link></li>
             </div>
          </div>
          
   
          
           <div className="flex items-center section">
             <div>
                 <h4> Quick Access</h4>
                 { q.map((item)=>(
                     <li className="section-item">
                         <Link to={`${item.to}`}>{item.label}</Link>
                     </li>
                 ))  }
             </div>
          </div>
          
          
      </div>
        
        </div>
        
    </div>
  )
};

export default LeftSidebar;