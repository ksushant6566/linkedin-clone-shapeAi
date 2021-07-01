import React from 'react';
import './index.css';

function InputOption({ Icon, title, color, handleclick }) {
  return <div style={{ color: color}} onClick={() => handleclick()} className="inputOption">
    <Icon  />
    <h4>{title}</h4>
  </div>;
};

export default InputOption;