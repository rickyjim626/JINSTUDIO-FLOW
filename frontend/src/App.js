// In frontend/src/App.js

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'react-flow-renderer';
import { useFlowState } from './hooks/useFlowState';
import { useNodeOperations } from './hooks/useNodeOperations';
import { useFileOperations } from './hooks/useFileOperations';
import CustomNode from './components/CustomNode';
import Sidebar from './components/Sidebar';
import ControlPanel from './components/ControlPanel';
import WorkflowList from './components/WorkflowList';
import TextInputNode from './components/TextInputNode';
import axios from 'axios';

const nodeTypes = {
  custom: CustomNode,
  text_input: TextInputNode,
};

const App = () => {
  const {
    elements,
    setElements,
    loading,
    error,
    handleNodeDataChange,
    workflows,
    currentWorkflow,
    fetchWorkflow,
    createWorkflow,
    updateWorkflow,
    saveCurrentWorkflow,
  } = useFlowState();

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (error && error.includes('Network Error')) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [error]);

  const { handleAddNode, handleDeleteNode } = useNodeOperations(setElements);
  const { saveToFile, loadFromFile, exportImage } = useFileOperations(elements, setElements);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = { x: event.clientX, y: event.clientY };
      handleAddNode(type, position);
    },
    [handleAddNode]
  );

  if (!isConnected) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>连接错误</h2>
        <p>无法连接到服务器。请确保后端服务器正在运行，并刷新页面重试。</p>
      </div>
    );
  }

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>加载中...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>错误</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>重试</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onAddNode={handleAddNode} />
      <div style={{ flex: 1 }}>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onElementsRemove={(elementsToRemove) => elementsToRemove.forEach(el => handleDeleteNode(el.id))}
          onNodeDoubleClick={(event, node) => {
            const newData = prompt('输入新数据:', node.data.label);
            if (newData) {
              handleNodeDataChange(node.id, newData);
            }
          }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <div style={{ width: '250px', display: 'flex', flexDirection: 'column' }}>
        <WorkflowList
          workflows={workflows}
          onSelectWorkflow={fetchWorkflow}
          onCreateWorkflow={createWorkflow}
        />
        <ControlPanel
          onSave={() => updateWorkflow(currentWorkflow, elements)}
          onLoad={loadFromFile}
          onExport={exportImage}
        />
        <button onClick={saveCurrentWorkflow} disabled={!currentWorkflow}>
          保存当前工作流
        </button>
      </div>
    </div>
  );
};

export default App;