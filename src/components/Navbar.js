import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  {
    /* this const subnav is used to check the state of the element that is whether it is clicked or not */
  }

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars-hamburger">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              if (item.subNav) {
                return (
                  <>
                    <li key={index} className={item.cName}>
                      {/* the onclick function checks if the item has a sub nav */}
                      <a
                        href={"#" + item.path}
                        onClick={item.subNav && showSubnav}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                        {/* this is used to check if the item has subnav and if so to
                      display them */}
                        <div>
                          {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                            ? item.iconClosed
                            : null}
                        </div>
                      </a>
                    </li>
                    <ul className="sub-nav">
                      {subnav &&
                        item.subNav.map((item, index) => {
                          return (
                            <li className="nav-text">
                              <Link to={item.path} key={index}>
                                {item.icon}
                                <span>{item.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </>
                );
              } else {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
