import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import { Input } from 'semantic-ui-react'

const baseUrl = 'http://localhost:8080/users'

const ResetPassword = () => {
    const { resetToken } = useParams()
    const history = useHistory()

    const [info, setInfo] = useState({
        password: '',
    })
    const [resMsg, setResMsg] = useState('')

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
            await axios.post(`${baseUrl}/reset/${resetToken}`, info);
            setResMsg("password changed successfully!");
            history.push('/login')
        } catch (error) {
            console.log(error.response.data.err)
            setResMsg(error.response.data.err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                New Password
            </label>
            <Input
                fluid
                name='password'
                placeholder='password'
                value={info.password}
                onChange={handleChange}
            />
            <br />
            <button className='auth-btn'>
                Reset password
            </button>
            {resMsg === '' ? null : (
                <h1 className="auth-msg">{resMsg}</h1>
            )}
        </form>
    );
}

export default ResetPassword;