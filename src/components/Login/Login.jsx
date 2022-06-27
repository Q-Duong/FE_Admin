import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import { employeeAPI } from '../../../axios/exeAPI';
import { useDispatch } from 'react-redux';
import "./Login.css"

function Login(props) {

//   function handleLoginSubmit(formValues) {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const { email, password } = formValues

//     async function getToken() {
//         try {                
//             console.log(email,password)
//             const response = await employeeAPI.login({email,password})
//             if (response.status === 200) {
//                 dispatch(addToken(response.data.accessToken))
//                 alert('đăng nhập thành công')
//                 history.push('/')
//             }
//             else {
//                 alert('đăng nhập thất bại')
//             }
//         }
//         catch (err) {
//             alert('đăng nhập thất bại')
//             console.log(err)
//         }
//     }

//     getToken()
// }
const { onLoginSubmit } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginSubmit(e) {
        e.preventDefault()
        const formvalues = {
            email,
            password
        }
        onLoginSubmit(formvalues)
    }

    

  return (
    <div className="log-w3">
        <div className="w3layouts-main">
            <h2>Đăng nhập</h2>
           
                <div className="alert alert-danger"></div>
            

            <form onSubmit={handleLoginSubmit}>
                
                <input type="text" className="ggg" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Điền E-Mail" required="" />
                <input type="password" className="ggg" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Điền Password" required="" />
                <span><input type="checkbox" />Nhớ lần đăng nhập tới</span>
                <h6><a href="#">Quên mật khẩu</a></h6>
                <div className="clearfix"></div>
                <input type="submit" value="Đăng nhập" name="login" />
            </form>
            <p>Don't Have an Account ?<a href="registration.html">Create an account</a></p>
        </div>
    </div>
  )
}

Login.propTypes = {}

export default Login
