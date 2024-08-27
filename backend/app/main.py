import os
import sys

# 将父目录添加到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from comfy.node import Node
from comfy.workflow import Workflow

load_dotenv()

app = Flask(__name__)
CORS(app)

workflows = {}  # 用于存储所有工作流

@app.route('/api/workflows', methods=['GET'])
def get_workflows():
    return jsonify({"workflows": list(workflows.keys())}), 200

@app.route('/api/workflows', methods=['POST'])
def create_workflow():
    data = request.json
    name = data.get('name')
    if name and name not in workflows:
        workflows[name] = Workflow()
        return jsonify({"message": f"Workflow '{name}' created"}), 201
    return jsonify({"error": "Invalid name or workflow already exists"}), 400

@app.route('/api/workflows/<name>', methods=['GET'])
def get_workflow(name):
    if name in workflows:
        return jsonify(workflows[name].to_dict()), 200
    return jsonify({"error": "Workflow not found"}), 404

@app.route('/api/workflows/<name>', methods=['PUT'])
def update_workflow(name):
    if name in workflows:
        data = request.json
        workflow = workflows[name]
        workflow.nodes.clear()
        workflow.connections.clear()
        
        for node_data in data.get('nodes', []):
            node = Node(
                id=node_data['id'],
                type=node_data['type'],
                name=node_data['name'],
                inputs=node_data.get('inputs', []),
                outputs=node_data.get('outputs', []),
                config=node_data.get('config', {})
            )
            workflow.add_node(node)
        
        for connection in data.get('connections', []):
            workflow.connect(
                connection['from']['node'],
                connection['from']['output'],
                connection['to']['node'],
                connection['to']['input']
            )
        
        return jsonify({"message": f"Workflow '{name}' updated"}), 200
    return jsonify({"error": "Workflow not found"}), 404

@app.route('/api/workflows/<name>', methods=['DELETE'])
def delete_workflow(name):
    if name in workflows:
        del workflows[name]
        return jsonify({"message": f"Workflow '{name}' deleted"}), 200
    return jsonify({"error": "Workflow not found"}), 404

# 保留原有的节点 API
@app.route('/api/nodes', methods=['GET'])
def get_nodes():
    nodes = [
        Node("1", "input", "导演", outputs=["剧本"]).to_dict(),
        Node("2", "default", "制作中台", inputs=["剧本"], outputs=["素材"]).to_dict(),
        Node("3", "default", "剪辑师", inputs=["���材"], outputs=["初剪"]).to_dict(),
        Node("4", "output", "调色师", inputs=["初剪"], outputs=["成片"]).to_dict(),
        Node("5", "text_input", "文字input", inputs=["文件"], outputs=["处理后的数据"], 
             config={"textAreaRows": 5}).to_dict(),
    ]
    return jsonify({"nodes": nodes}), 200

if __name__ == '__main__':
    print("正在启动服务器...")
    app.run(debug=True, host='0.0.0.0', port=5001)
    print("服务器正在运行，地址为 http://localhost:5001")