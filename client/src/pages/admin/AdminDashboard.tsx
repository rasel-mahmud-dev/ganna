import React from 'react';
import {Link, Outlet} from "react-router-dom";

import "./style.scss";


const AdminDashboard = () => {
    const items = [
        { name: "Dashboard", to: "/admin" },
        { name: "Song", to: "/admin/songs" },
        { name: "Add Song", to: "/admin/add-song" },
        { name: "users", to: "/admin/users" },
        { name: "Artist", to: "/admin/artist" },
    ]
    
    return (
        <div className="dashboard">
            
            <div className="content-route">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;