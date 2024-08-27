import React from 'react';

const ContextMenu = ({ x, y, onDelete, onClose }) => {
  return (
    <div style={{
      position: 'absolute',
      top: y,
      left: x,
      background: 'white',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      borderRadius: '4px',
      zIndex: 1000,
    }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <li 
          style={{ 
            padding: '8px 12px', 
            cursor: 'pointer', 
            hover: { backgroundColor: '#f0f0f0' } 
          }}
          onClick={() => { onDelete(); onClose(); }}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;