import { useCallback } from 'react';

export const useNodeOperations = (setElements) => {
  const handleNodeDataChange = useCallback((nodeId, newValue) => {
    setElements(els => els.map(el => 
      el.id === nodeId ? { ...el, data: { ...el.data, label: newValue } } : el
    ));
  }, [setElements]);

  const handleAddNode = useCallback((type, position) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: 'custom',
      data: { 
        label: `新${type}节点`,
      },
      position: position || { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setElements(els => [...els, newNode]);
  }, [setElements]);

  const handleDeleteNode = useCallback((nodeId) => {
    setElements(els => els.filter(el => el.id !== nodeId));
  }, [setElements]);

  return { handleAddNode, handleDeleteNode, handleNodeDataChange };
};