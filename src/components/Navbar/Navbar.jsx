import React from "react";
import { Dropdown } from "react-bootstrap";
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
                    <NotifiInfo />
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
