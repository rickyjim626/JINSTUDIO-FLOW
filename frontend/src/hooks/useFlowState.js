import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

export const useFlowState = () => {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [currentWorkflow, setCurrentWorkflow] = useState(null);

  const handleNodeDataChange = useCallback((nodeId, newValue) => {
    setElements(els => els.map(el => 
      el.id === nodeId ? { ...el, data: { ...el.data, label: newValue } } : el
    ));
  }, []);

  const fetchNodes = useCallback(async (retryCount = 0) => {
    try {
      console.log('Fetching nodes...');
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/nodes`);
      console.log('Response:', response.data);
      const fetchedNodes = response.data.nodes.map(node => ({
        id: node.id,
        type: node.type === 'text_input' ? 'text_input' : 'custom',
        data: { 
          label: node.name,
          ...node.config,
        },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      }));
      setElements(prevElements => [...prevElements, ...fetchedNodes]);
      setError(null);
    } catch (error) {
      console.error('Error fetching nodes:', error);
      if (retryCount < 3) {
        console.log(`Retrying... (${retryCount + 1}/3)`);
        setTimeout(() => fetchNodes(retryCount + 1), 2000);
      } else {
        setError('Failed to fetch nodes. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWorkflows = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/workflows`);
      setWorkflows(response.data.workflows);
      setError(null);
    } catch (error) {
      console.error('Error fetching workflows:', error);
      setError('获取工作流列表失败。请稍后再试。');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWorkflow = useCallback(async (workflowName) => {
    if (!workflowName) return;

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/workflows/${workflowName}`);
      const fetchedNodes = response.data.nodes.map(node => ({
        id: node.id,
        type: node.type === 'text_input' ? 'text_input' : 'custom',
        data: { 
          label: node.name,
          ...node.config,
        },
        position: node.position || { x: Math.random() * 500, y: Math.random() * 500 },
      }));
      setElements(fetchedNodes);
      setCurrentWorkflow(workflowName);
      setError(null);
    } catch (error) {
      console.error('Error fetching workflow:', error);
      setError('Failed to fetch workflow. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorkflow = useCallback(async (name) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/workflows`, { name });
      setCurrentWorkflow(name);
      setElements([]);
      await fetchWorkflows();
      setError(null);
    } catch (error) {
      console.error('Error creating workflow:', error);
      setError('Failed to create workflow. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [fetchWorkflows]);

  const updateWorkflow = useCallback(async () => {
    if (!currentWorkflow) return;

    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/api/workflows/${currentWorkflow}`, {
        nodes: elements.map(el => ({
          id: el.id,
          type: el.type,
          name: el.data.label,
          position: el.position,
          config: el.data,
        })),
      });
      setError(null);
    } catch (error) {
      console.error('Error updating workflow:', error);
      setError('Failed to update workflow. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [currentWorkflow, elements]);

  const saveCurrentWorkflow = useCallback(async () => {
    if (!currentWorkflow) return;

    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/api/workflows/${currentWorkflow}`, {
        nodes: elements.map(el => ({
          id: el.id,
          type: el.type,
          name: el.data.label,
          inputs: el.data.inputs,
          outputs: el.data.outputs,
          config: el.data.config,
        })),
        connections: elements
          .filter(el => el.source && el.target)
          .map(el => ({
            from: { node: el.source, output: el.sourceHandle },
            to: { node: el.target, input: el.targetHandle },
          })),
      });
      setError(null);
    } catch (error) {
      console.error('Error saving workflow:', error);
      setError('Failed to save workflow. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [currentWorkflow, elements]);

  useEffect(() => {
    fetchNodes();
    fetchWorkflows();
  }, [fetchNodes, fetchWorkflows]);

  return {
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
  };
};