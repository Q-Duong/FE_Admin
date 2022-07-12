import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      <aside>
        <div id="sidebar" class="nav-collapse">
          <div class="leftside-navigation" >
            <ul class="sidebar-menu" id="nav-accordion">
            {SidebarData.map((item) =>(
                <li >
                  <Link to={`/${item.heading}`}>
                    <item.icon />
                    {item.title}
                  </Link>
                    
                </li>))}
            </ul>
          </div>
        </div>
      </aside>
    
    </>
  );
};

export default Sidebar;
