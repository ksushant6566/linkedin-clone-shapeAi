import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/auth'

import { Input } from 'semantic-ui-react'

const baseUrl = 'http://localhost:8080/users'

const Login = () => {
    const { login } = useContext(AuthContext)
    const history = useHistory();

    const [resMsg, setResMsg] = useState([])
    const [info, setInfo] = useState({
        username: '',
        password: '',
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/login`, info);
            login(res.data)
            history.push('/feed')
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
                Signin
            </button>
            <br/>
            <br/>
            <div className="auth-link-container">
                <Link to='/forgot-password' >
                    forgot passport
                </Link>
                <Link to='signup' >
                    Join now
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

export default Login;