import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
      <Handle type="target" position="top" />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;