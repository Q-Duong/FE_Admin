import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser,faBox,faGear,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './NotifiInfo.css'



import { useSelector } from 'react-redux';

NotifiInfo.propTypes = {
    onLogout: PropTypes.func,
};

function NotifiInfo(props) {
    const { onLogout, cartItems, token } = props

    function handleLogout() {
        if (onLogout) {
            onLogout()
        }
    }

    return (
        <Dropdown.Menu>
             <span className="caret"></span>
            {   
                <>
                    <Dropdown.Item className="cartDetails-top" href="/cart">
                        Có 8 thông báo mới. 
                    </Dropdown.Item>
                    <Dropdown.Item href="/cart">
                         Giỏ hàng 8
                    </Dropdown.Item>
                       
                </>    
            }
        </Dropdown.Menu>

    );
}

export default NotifiInfo;