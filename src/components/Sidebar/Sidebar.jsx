import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {Link} from 'react-router-dom'
import { protectedAPI } from "../../axios/exeAPI";
import {
  UilEstate,
} from "@iconscout/react-unicons";
import {useSelector} from 'react-redux'
const Sidebar = () => {
  const [collections, setCollections] = useState([])
  const token = useSelector(state => state.token)
  useEffect(() => {
    async function getCollections(){
      try {
        const res = await protectedAPI.getAllLinkRoute(token)
        const data = res.data
        setCollections(data)
      } catch (error) {
        alert(error)
      }
    }
    getCollections()
  },[])
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
            {collections.map((collection) =>(
                <li >
                  <Link to={`/${collection.heading}`}>
                    <UilEstate />
                    {collection.title}
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
