import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: '15px', borderRight: '1px solid #eee', background: '#fcfcfc' }}>
      <div className="description">您可以将这些节点拖到右侧的画布上。</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        输入节点
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        默认节点
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        输出节点
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'text_input')} draggable>
        文字输入节点
      </div>
    </aside>
  );
};

export default Sidebar;