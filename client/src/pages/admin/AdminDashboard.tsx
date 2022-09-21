import React from 'react';
import {Link, Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";

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
            <Sidebar className="dashboard-sidebar">
                <div className="slidebar-list">
                    {items.map((item)=>(
                        <div>
                            <li>
                                <Link to={item.to}>{item.name}</Link>
                            </li>
                        </div>
                    ))}
                </div>
            </Sidebar>
            <div className="content">
                <div className="content-route">
                     <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;