// Create a new file: frontend/src/components/TextInputNode.js

import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';

const TextInputNode = ({ data }) => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
    if (data.onChange) {
      data.onChange(event.target.value);
    }
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setText(e.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: 'white' }}>
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <div>{data.label}</div>
      <textarea
        value={text}
        onChange={handleTextChange}
        rows={data.config?.textAreaRows || 5}
        style={{ width: '100%', marginTop: 10 }}
      />
      <input type="file" onChange={handleFileInput} style={{ marginTop: 10 }} />
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  );
};

export default TextInputNode;