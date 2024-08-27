import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ 
      width: '200px', 
      padding: '15px', 
      borderRight: '1px solid #ddd', 
      backgroundColor: '#f8f8f8' 
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Node Types</h3>
        <div 
          onDragStart={(event) => onDragStart(event, 'input')} 
          draggable
          style={{ 
            cursor: 'move', 
            padding: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            marginBottom: '10px',
            backgroundColor: '#fff'
          }}
        >
          Input Node
        </div>
        <div 
          onDragStart={(event) => onDragStart(event, 'default')} 
          draggable
          style={{ 
            cursor: 'move', 
            padding: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            marginBottom: '10px',
            backgroundColor: '#fff'
          }}
        >
          Default Node
        </div>
        <div 
          onDragStart={(event) => onDragStart(event, 'output')} 
          draggable
          style={{ 
            cursor: 'move', 
            padding: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            backgroundColor: '#fff'
          }}
        >
          Output Node
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;