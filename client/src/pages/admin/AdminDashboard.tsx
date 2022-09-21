import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
    const items = [
        { name: "Add Song" },
        { name: "Add Song" },
        { name: "Add Song" },
        { name: "Add Song" },
    ]
    
    return (
        <div className="dashboard">
            <Sidebar className="dashboard-sidebar">
                {items.map((item)=>(
                    <div>
                        <li>{item.name}</li>
                    </div>
                ))}
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