import React, {SyntheticEvent} from "react";

import "./style.scss";
import {BiUser} from "react-icons/all";
import {Link} from "react-router-dom";

const LeftSidebar = (props) => {
    
    const {isOpenLeftSidebar, onClose} = props;
    
    function clickOnBackdrop(e: SyntheticEvent){
        let el = e.target as HTMLDivElement
        if(el.classList.contains("left-sidebar__backdrop")){
            onClose()
        }
    }
  
  return isOpenLeftSidebar ? (
    <div>
      <div className="left-sidebar__backdrop" onClick={clickOnBackdrop}></div>
      <div className="left-sidebar">
          
          <div className="first-section">
              <div className="flex items-center">
                  <BiUser />
                  <h4 className="label">Login / Sign Up</h4>
              </div>
          </div>
          
          <div className="flex items-center border-b section">
             <div>
                 <h4>Music</h4>
                 <li><Link to="/">Playlist</Link></li>
                 <li><Link to="/favorite">Favorite</Link></li>
             </div>
          </div>
          
          <div className="section">
              <h4>My Music</h4>
          </div>
          
          
      </div>
    </div>
  ) : "";
};

export default LeftSidebar;