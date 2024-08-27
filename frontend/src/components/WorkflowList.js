// Create a new file: frontend/src/components/WorkflowList.js

import React from 'react';

const WorkflowList = ({ workflows, onSelectWorkflow, onCreateWorkflow }) => {
  return (
    <div>
      <h3>工作流列表</h3>
      <ul>
        {workflows.map(workflow => (
          <li key={workflow} onClick={() => onSelectWorkflow(workflow)}>
            {workflow}
          </li>
        ))}
      </ul>
      <button onClick={() => onCreateWorkflow(prompt('请输入新工作流名称:'))}>
        创建新工作流
      </button>
    </div>
  );
};

export default WorkflowList;