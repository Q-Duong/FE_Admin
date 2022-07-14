import React, { useEffect } from 'react';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { protectedAPI } from '../../axios/exeAPI';
import { Alert } from '@mui/material';


function ProtectedRoute(props) {
    const {permission, children} = props
    const [isAuthor, setIsAuthor] = useState(false)
    const token = useSelector(state => state.token)
    useEffect(() => {
        async function checkRoute(){
            try {
                const res = await protectedAPI.checkRoute(token,permission)
                console.log(res.data.message)
                setIsAuthor(true)
            } catch (error) {
                console.log(error)
                setIsAuthor(false)
            }
        }
        checkRoute()
    },[permission])
    
    return (
        isAuthor ?
        children : 
       <></>
    );
}   

export default ProtectedRoute;