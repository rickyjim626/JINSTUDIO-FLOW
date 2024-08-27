# JinStudio Flow 项目结构和文档

## 项目概述

JinStudio Flow 是一个基于节点的工作流编辑器，允许用户通过图形界面创建和管理复杂的工作流程。该项目分为前端和后端两个主要部分。

## 目录结构

```
jinstudio-flow/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── ControlPanel.js
│   │   │   ├── CustomNode.js
│   │   │   ├── ContextMenu.js
│   │   │   ├── TextInputNode.js
│   │   │   └── WorkflowList.js
│   │   ├── hooks/
│   │   │   ├── useFileOperations.js
│   │   │   ├── useFlowState.js
│   │   │   └── useNodeOperations.js
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── comfy/
│   │   ├── __init__.py
│   │   ├── node.py
│   │   └── workflow.py
│   ├── requirements.txt
│   └── .gitignore
├── server.js
├── package.json
└── package-lock.json
```

## 前端 (frontend/)

### public/

- `index.html`: 主 HTML 文件，是 React 应用的入口点。
- `manifest.json`: Web 应用程序清单文件，提供应用程序的元数据。

### src/

#### components/

- `Sidebar.js`: 实现侧边栏组件，显示可拖拽的节点类型。
- `ControlPanel.js`: 实现控制面板组件，包含保存、加载和导出功能。
- `CustomNode.js`: 定义自定义节点的基本结构和样式。
- `ContextMenu.js`: 实现右键菜单功能，如删除节点。
- `TextInputNode.js`: 实现文字输入节点，包含长文本输入框和文件输入功能。
- `WorkflowList.js`: 显示工作流列表，允许用户选择和创建工作流。

#### hooks/

- `useFileOperations.js`: 包含文件操作相关的钩子函数，如保存、加载和导出图像。
- `useFlowState.js`: 管理流程图的状态，包括从后端获取节点数据和工作流操作。
- `useNodeOperations.js`: 包含节点操作相关的钩子函数，如添加、删除和修改节点。

#### config/

- `api.js`: 定义后端API的基础URL。

#### 其他文件

- `App.js`: 主 React 组件，组织整个应用的结构。
- `index.js`: React 应用的入口文件，负责渲染 App 组件。

### 配置文件

- `package.json`: 定义项目依赖和脚本。
- `package-lock.json`: 锁定依赖版本，确保一致的构建。

## 后端 (backend/)

### app/

- `__init__.py`: 将 app 目录标记为 Python 包。
- `main.py`: Flask 应用的主文件，定义 API 路由和服务器配置。

### comfy/

- `__init__.py`: 将 comfy 目录标记为 Python 包。
- `node.py`: 定义 Node 类，表示工作流中的节点。
- `workflow.py`: 定义 Workflow 类，管理整个工作流程。

### 其他文件

- `requirements.txt`: 列出 Python 项目依赖。
- `.gitignore`: 指定 Git 应忽略的文件和目录。

## 根目录文件

- `server.js`: Express 服务器文件，可能用于开发环境或作为前端的简单后端。
- `package.json`: 定义整个项目的依赖和脚本。
- `package-lock.json`: 锁定整个项目的依赖版本。

## 功能概述

1. **节点编辑**: 用户可以通过拖放方式在画布上添加、移动和连接节点。
2. **自定义节点**: 支持多种节点类型，包括普通节点、输入节点、输出节点和文字输入节点。
3. **工作流管理**: 用户可以创建、保存、加载和删除工作流。
4. **文件操作**: 支持将工作流保存为 JSON 文件，以及从 JSON 文件加载工作流。
5. **图像导出**: 可以将当前工作流导出为图片。
6. **后端集成**: 前端通过 API 与后端通信，获取节点数据和执行工作流操作。
7. **文本处理**: 文字输入节点支持长文本输入和文件导入功能。

## 开发和部署

1. 前端开发:
   ```
   cd frontend
   npm install
   npm start
   ```

2. 后端开发:
   ```
   cd backend
   pip install -r requirements.txt
   python app/main.py
   ```

3. 构建前端:
   ```
   cd frontend
   npm run build
   ```

4. 部署:
   - 前端: 将 `frontend/build` 目录部署到 web 服务器
   - 后端: 使用 WSGI 服务器（如 Gunicorn）运行 Flask 应用

## 注意事项

- 确保前后端的 API 端点配置一致。
- 在生产环境中，应该使用环境变量来管理敏感信息和配置。
- 定期更新依赖以保持安全性和性能。
- 在开发过程中，注意保持前后端代码的同步，特别是在修改工作流和节点结构时。