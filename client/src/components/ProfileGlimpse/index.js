import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../context/auth'

// styles
import './index.css'

const ProfileGlimpse = () => {
    const { user } = useContext(AuthContext)
    const history = useHistory()

    if(user && !user.img) {
        user.img = "https://media-exp1.licdn.com/dms/image/C4E03AQEwVhBfTcHuiw/profile-displayphoto-shrink_100_100/0/1622700834523?e=1629936000&v=beta&t=as2AfG1OxMs3vLj2rIIIjkym6rosv2or7vE105yTPzk"
    }

    if(!user) {
        history.push('/login')
        return null;
    }

    return (    
        <div className="profileGlimpse">
            <div className="profile-img">
                {/* <div className="profile-img-background"></div> */}
                <img src={user.img} alt={user.username} />
            </div>
            <div className="profileGlimpse-userInfo">
                <h5>{user.username}</h5>
                <p>{user.bio} | {user.bio}</p>
            </div>
        </div>
    )
}

export default ProfileGlimpse;