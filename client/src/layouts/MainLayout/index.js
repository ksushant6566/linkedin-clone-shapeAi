import React from 'react';

// components
import ProfileGlimpse from '../../components/ProfileGlimpse'
import DummyRight from '../../components/DummyRight'

// styles
import './index.css'

const MainLayout = ({ Component }) => {


    return (
        <div className="mainLayout">
            <div className="mainLayout-item-wrap profileGlimpse-wrap">
                <ProfileGlimpse />
            </div>
            <div className="mainLayout-item-wrap">
                <Component />
            </div>
            <div className="mainLayout-item-wrap">
                <DummyRight />
            </div>
            
        </div>
    )
}

export default MainLayout;