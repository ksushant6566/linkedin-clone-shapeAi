import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';

import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react'

import './index.css'

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        const pathname = window.location.pathname;
        const path = pathname === '/' ? 'home' : pathname.substring(1);
        setActiveItem(path)
    }, [user])

    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <div className='header-wrap'>
            <Menu pointing secondary size='large' color='black' className='header' >
                <Menu.Item
                    name='home'
                >
                    <Icon name="linkedin" size='big' style={{ color: '#0a66c2' }} />
                </Menu.Item>
                {user === null ? (
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='join now'
                            active={activeItem === 'join now'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/signup'
                        />
                        <Menu.Item
                            name='sign in'
                            active={activeItem === 'sign in'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/login'
                        />
                    </Menu.Menu>
                ) : (
                    <Menu.Menu position='right'>
                        {/* <div>
                            <Input icon placeholder='Search...'>
                                <input />
                                <Icon name='search' />
                            </Input>
                        </div> */}
                        <Menu.Item
                            name='home'
                            active={activeItem === 'home'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/'
                            className='nav-item'
                        >
                            <Icon name='home' />
                            <p>Home</p>
                        </Menu.Item>
                        <Menu.Item
                            name='my network'
                            active={activeItem === 'my network'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/mynetwork'
                            className='nav-item'
                        >
                            <Icon name='users' />
                            <p>My network</p>
                        </Menu.Item>
                        <Menu.Item
                            name='jobs'
                            active={activeItem === 'jobs'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/jobs'
                            className='nav-item'
                        >
                            <Icon name='briefcase' />
                            <p>Jobs</p>
                        </Menu.Item>
                        <Menu.Item
                            name='messaging'
                            active={activeItem === 'messaging'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/messaging'
                            className='nav-item'
                        >
                            <Icon name='comment alternate' />
                            <p>Messaging</p>
                        </Menu.Item>
                        <Menu.Item
                            name='notifications'
                            active={activeItem === 'notifications'}
                            onClick={handleItemClick}
                            as={Link}
                            to='/notifications'
                            className='nav-item'
                        >
                            <Icon name='bell' />
                            <p>Notifications</p>
                        </Menu.Item>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={() => logout()}
                        />
                    </Menu.Menu>
                )}
            </Menu>
        </div>
    )
}

export default Header;