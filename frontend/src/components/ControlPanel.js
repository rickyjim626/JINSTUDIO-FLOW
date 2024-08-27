import React from 'react';

const ControlPanel = ({ onSave, onLoad, onExport }) => {
  return (
    <div style={{ padding: '15px', borderLeft: '1px solid #eee', background: '#fcfcfc' }}>
      <button onClick={onSave}>保存流程</button>
      <input type="file" onChange={onLoad} />
      <button onClick={onExport}>导出为图片</button>
    </div>
  );
};

export default ControlPanel;