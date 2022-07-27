import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import './NotifiInfo.css'



import { useSelector } from 'react-redux';
import { notificationAPI } from '../../axios/exeAPI';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import countRangeTime from '../../utils/countRangeTime';

NotifiInfo.propTypes = {
    onLogout: PropTypes.func,
};

function NotifiInfo(props) {
    const [notifications, setNotifications] = useState([])
    const token = useSelector(state => state.token)

    useEffect(() => {
        async function getNotifications() {
            try {
                const res = await notificationAPI.getAll(token)
                const data = res.data
                setNotifications(data)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getNotifications()
    },[])

    return (
        <Dropdown className="buttomNoti">
            <Dropdown.Toggle className="buttomOpiton" id="dropdown-custom-components">

                <FontAwesomeIcon icon={faBell} />

                <span className="badge bg-warning">{notifications.filter(noti => !noti.isRead).length}</span>


            </Dropdown.Toggle>
            <Dropdown.Menu>
                <span className="caret"></span>
                {
                    notifications.map(notification => (
                        <Dropdown.Item key={notification._id} className="cartDetails-top" href="/cart">
                            {notification.content} - {countRangeTime(notification.createdAt)}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NotifiInfo;