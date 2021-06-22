import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Input } from 'semantic-ui-react'

const baseUrl = 'http://localhost:8080/users'

const ResetPassword = () => {
    const { resetToken } = useParams()
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
            const { data } = await axios.post(`${baseUrl}/reset/${resetToken}`, info);
            
            setResMsg( data.err ? data.err : data.msg );
        } catch (error) {
            console.log(error)
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