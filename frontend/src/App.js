import React, { useState, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';
import axios from 'axios';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nodes');
        const fetchedNodes = response.data.nodes.map((node, index) => ({
          id: `${index}`,
          type: 'default',
          data: { label: node },
          position: { x: 250 * index, y: 5 },
        }));
        setNodes(fetchedNodes);
      } catch (error) {
        console.error('Error fetching nodes:', error);
      }
    };

    fetchNodes();
  }, []);

  const onConnect = (params) => setEdges((eds) => [...eds, params]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        connectionLineType="bezier"
      />
    </div>
  );
};

export default App;
