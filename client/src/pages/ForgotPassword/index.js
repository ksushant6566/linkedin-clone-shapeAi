import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Input } from 'semantic-ui-react'

const baseUrl = 'http://localhost:8080/users'

const ForgotPassword = () => {
    const [info, setInfo] = useState({
        username: '',
    })
    const [resMsg, setResMsg] = useState('')
    const [errMsg, setErrMsg] = useState([])

    const handleChange = e => {
        const { name, value } = e.target;
        setResMsg("");
        setInfo({
            ...info,
            [name]: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${baseUrl}/forgot-password`, info);
            setResMsg(data.msg);
        } catch (error) {
            setErrMsg(error.response.data.err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                username
            </label>
            <Input
                fluid
                name='username'
                placeholder='username'
                value={info.username}
                onChange={handleChange}
            />
            <br />
            <button className='auth-btn'>
                Send reset password email
            </button>
            <div className="auth-link-container">
                <Link to='/login' >
                    Login
                </Link>
                <Link to='signup' >
                    Join now
                </Link>
            </div>

            {resMsg === '' ? null : (
                <h1 key={resMsg} className="auth-msg">{resMsg}</h1>
            )}
            <div className="auth-msg-container">
                {errMsg.length === 0 ? null : (
                    errMsg.map(err => (
                        <h1 key={err.msg} className="auth-msg">{err.msg}</h1>
                    ))
                )}
            </div>
        </form>
    );
}

export default ForgotPassword;