import React from "react";
import './index.css';

const Modal = ({ hideModal, toggleHide, children }) => {
    if(hideModal) return null;
    
    return (
        <>
            <div className="modalOverlay" onClick={() => toggleHide()}></div>
                <div className="modalWrap">
                    <div className="modal">
                        {children}
                    </div>
                </div>
        </>
    )
}

export default Modal;