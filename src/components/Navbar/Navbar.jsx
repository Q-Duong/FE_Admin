import React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NotifiInfo from "../NotifiInfo/NotifiInfo";
const Navbar = (props) => {

    const { onLogout} = props
    function handleLogout() {
        if (onLogout) {
            onLogout()
        }
    }

    return (
        <>
        <header className="header fixed-top clearfix">
                <div className="brand">
                    <a href="index.html" className="logo">
                        ADMIN
                    </a>
                    <div className="sidebar-toggle-box">
                        <div className="fa fa-bars"></div>
                    </div>
                </div>
                <div className="nav notify-row" id="top_menu">
                    <Dropdown className="buttomNoti">
                        <Dropdown.Toggle className="buttomOpiton"  id="dropdown-custom-components">
                           
                        <FontAwesomeIcon icon={faBell} />
                       
                            <span className="badge bg-warning">8</span>
                            
                        
                        </Dropdown.Toggle>
                        <NotifiInfo   />
                    </Dropdown>
                    
                </div>
                <div className="top-nav clearfix">
                    
                    <ul className="nav pull-right top-menu">
                        <li>
                            <input type="text" className="form-control search" placeholder=" Search" />
                        </li>
                    
                        <li className="dropdown">
                            <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dương
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item ></Dropdown.Item>
                                        <Dropdown.Item >
                                            Tài khoản
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>
                                            Đăng xuất
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                        </li>

                    </ul>
                </div>
            </header>
        </>
    );
};

export default Navbar;
