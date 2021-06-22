import React from 'react'
import { Icon } from 'semantic-ui-react'
import './index.css'

const AuthLayout = ({ Component }) => {

    return (
        <div className='auth-wrap'>
            <div className='primary-header'>
                Linked
                <Icon name='linkedin' />
            </div>
            <h1 className='secondary-header'>
                Make the most of your professional life
            </h1>
            <div className='form-wrap'>
                <Component />
            </div>
        </div>
    );
}

export default AuthLayout;