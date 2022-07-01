import React from "react";
import { Dropdown } from "react-bootstrap";

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
                    <ul className="nav top-menu">
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <i className="fa fa-tasks"></i>
                                <span className="badge bg-success">8</span>
                            </a>
                            <ul className="dropdown-menu extended tasks-bar">
                                <li>
                                    <p className="">You have 8 pending tasks</p>
                                </li>
                                <li>
                                    <a href="#">
                                        <div className="task-info clearfix">
                                            <div className="desc pull-left">
                                                <h5>Target Sell</h5>
                                                <p>25% , Deadline  12 June’13</p>
                                            </div>
                                                    <span className="notification-pie-chart pull-right" data-percent="45">
                                            <span className="percent"></span>
                                            </span>
                                        </div>
                                    </a>
                                </li>
                                <li className="external">
                                    <a href="#">See All Tasks</a>
                                </li>
                            </ul>
                        </li>
                        
                        <li id="header_inbox_bar" className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <i className="far fa-envelope"></i>
                                <span className="badge bg-important">4</span>
                            </a>
                            <ul className="dropdown-menu extended inbox">
                                <li>
                                    <p className="red">You have 4 Mails</p>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="photo"><img alt="avatar" src="images/3.png" /></span>
                                        <span className="subject">
                                        <span className="from">Jonathan Smith</span>
                                        <span className="time">Just now</span>
                                        </span>
                                        <span className="message">
                                            Hello, this is an example msg.
                                        </span>
                                    </a>
                                </li>
                                
                                <li>
                                    <a href="#">See all messages</a>
                                </li>
                            </ul>
                        </li>
                    
                        <li id="header_notification_bar" className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <i className="far fa-bell"></i>
                                <span className="badge bg-warning">3</span>
                            </a>
                            <ul className="dropdown-menu extended notification">
                                <li>
                                    <p>Notifications</p>
                                </li>
                                <li>
                                    <div className="alert alert-info clearfix">
                                        <span className="alert-icon"><i className="fa fa-bolt"></i></span>
                                        <div className="noti-info">
                                            <a href="#"> Server #1 overloaded.</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    
                    </ul>
                    
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
