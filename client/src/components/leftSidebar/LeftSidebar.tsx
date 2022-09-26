import React, {SyntheticEvent} from "react";

import "./style.scss";
import {BiUser} from "react-icons/all";
import {Link} from "react-router-dom";
import staticPath from "../../utils/staticPath";

const LeftSidebar = (props) => {
    
    const {isOpenLeftSidebar,  auth, onClose} = props;
    
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
        {label: "Lyrics", to: ""},
        {label: "Music Labels", to: ""},
        {label: "Genres", to: "/genres"}
    ]
  
  return  (
    <div>
      <div className="left-sidebar__backdrop" onClick={clickOnBackdrop}></div>
      <div className="left-sidebar">
          
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
          
          <div className="flex items-center border-b section">
             <div>
                 <h4>Music</h4>
                 <li className="section-item"><Link to="/">Playlist</Link></li>
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
  )
};

export default LeftSidebar;