import React, { useState } from 'react'
import "./Login.css"
import { employeeAPI } from '../../axios/exeAPI';
import {useDispatch} from 'react-redux'
import { addToken,removeToken } from '../../Actions/tokenAction';

function Login(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    async function handleLoginSubmit(e) {
        e.preventDefault()
            try {     
                const response = await employeeAPI.login({email,password})
                if (response.status === 200) {
                    dispatch(addToken(response.data.accessToken))
                    alert('đăng nhập thành công')
                }
                else {
                    alert('đăng nhập thất bại')
                }
            }
            catch (err) {
                alert('đăng nhập thất bại')
                console.log(err)
            }
    }

    
    return (
        <div className="log-w3">
            <div className="w3layouts-main">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" className="ggg" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Điền E-Mail" required="" />
                    <input type="password" className="ggg" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Điền Password" required="" />
                    <span><input type="checkbox" />Nhớ lần đăng nhập tới</span>
                    <div className="clearfix"></div>
                    <input type="submit" value="Đăng nhập" name="login" />
                </form>
            </div>
        </div>
    )
}

export default Login
