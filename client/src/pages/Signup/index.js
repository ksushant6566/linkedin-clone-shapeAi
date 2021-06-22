import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import axios from 'axios'

import { Input } from 'semantic-ui-react'

const baseUrl = 'http://localhost:8080/users'

const Signup = () => {
    const history = useHistory();

    const [resMsg, setResMsg] = useState([])
    const [info, setInfo] = useState({
        username: '',
        email: '',
        password: '',
    })
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
            await axios.post(`${baseUrl}/signup`, info);
            history.push('/login')
        } catch (error) {
            setResMsg(error.response.data.err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
            </label>
            <Input
                fluid
                name='username'
                placeholder='Username'
                value={info.username}
                onChange={handleChange}
            />
            <br />
            <label>
                Email
            </label>
            <Input
                fluid
                name='email'
                placeholder='Email'
                value={info.email}
                onChange={handleChange}
            />
            <br />
            <label>
                Password (6 or more characters)
            </label>
            <Input
                fluid
                name='password'
                placeholder='Password'
                value={info.password}
                onChange={handleChange}
            />

            <button className='auth-btn'>
                Join Now
            </button>
            <div className="auth-link-container">
                <Link to='/Login' >
                    Login
                </Link>
            </div>

            <div className="auth-msg-container">
                {resMsg.length === 0 ? null : (
                    resMsg.map(err => (
                        <h1 key={err.msg} className="auth-msg">{err.msg}</h1>
                    ))
                )}
            </div>
        </form>
    );
}

export default Signup;