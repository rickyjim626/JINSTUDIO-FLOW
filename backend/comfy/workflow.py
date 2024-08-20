class Workflow:
    def __init__(self):
        self.nodes = {}
        self.connections = []

    def add_node(self, node):
        self.nodes[node.id] = node

    def connect(self, from_node_id, from_output, to_node_id, to_input):
        self.connections.append({
            "from": {"node": from_node_id, "output": from_output},
            "to": {"node": to_node_id, "input": to_input}
        })

    def execute(self):
        # 这里应该实现工作流的执行逻辑
        pass

    def to_dict(self):
        return {
            "nodes": [node.to_dict() for node in self.nodes.values()],
            "connections": self.connections
        }
