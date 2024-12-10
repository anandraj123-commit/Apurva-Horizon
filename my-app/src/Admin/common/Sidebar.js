import React, { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";
import { useLocation } from "react-router-dom";
// import CountryState from "../../Country-state/Country-state";
import { BsGlobeAmericas } from "react-icons/bs";
import "../asset/css/common.css";

const Sidebar = ({ isActive }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(
     "dashboard"
  );

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setActiveItem("dashboard"); // Default active item is dashboard for /admin
    }
    if (location.pathname.startsWith("/admin/content-type")) {
      setActiveItem("content-type"); // Set content-type active for its routes
    } else if (location.pathname.startsWith("/admin/Country-state")) {
      setActiveItem("Country-state"); // Set Country-state active for its route
    }
    // Add additional checks for other sections of the sidebar as needed
    else if (location.pathname.startsWith("/admin/user")) {
      setActiveItem("user");
    } else if (location.pathname.startsWith("/admin/category")) {
      setActiveItem("category");
    }
    localStorage.setItem("activeItem", activeItem);
  } ,[location,activeItem]);



  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <AiFillDashboard />, link: "/admin" },
    { id: "content-type", label: "Content-Type", icon: <LuFileType />, link: "/admin/content-type" },
    { id: "category", label: "Category", icon: <BiCategory />, link: "#" },
    { id: "user", label: "User", icon: <FaRegUserCircle />, link: "#" },
    {id: "Country-state", label: "Country-state", icon: <BsGlobeAmericas /> , link: "/admin/Country-state" }
  ];

  return (
    <nav id="sidebar" className={`sidebar ${isActive ? "active" : "inactive"}`}>
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="/">
          <span className="align-middle">Apurva Horizon</span>
        </a>

        <ul className="sidebar-nav">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
              onClick={() => setActiveItem(item.id)} // Update active state on click
            >
              <a className="sidebar-link" href={item.link}>
                <i className="align-middle">{item.icon}</i>{" "}
                <span className="align-middle">{item.label}</span>
              </a>
            </li>
            
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
