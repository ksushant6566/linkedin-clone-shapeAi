import React, { useContext, useState } from 'react'

import axios from 'axios'
import { AuthContext } from '../../context/auth'

import { Icon, Input, Button } from 'semantic-ui-react'
import './index.css'

const baseUrl = 'http://localhost:8080/users'

const Login = () => {
    const { login } = useContext(AuthContext)

    const [info, setInfo] = useState({
        username: '',
        password: '',
    })
    const handleChange = e => {
        const { name, value } = e.target;
        console.log(value);
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
        } catch (error) {
            
        }
    }

    return (
        <div className='login-wrap'>
            <div className='primary-header'>
                Linked
                <Icon name='linkedin' />
            </div>
            <h1 className='secondary-header'>
                Make the most of your professional life
            </h1>
            <div className='form-wrap'>
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

                    <button size='huge' fluid className='login-btn'>
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Login;