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
        results = {}
        for node_id, node in self.nodes.items():
            inputs = {}
            for conn in self.connections:
                if conn['to']['node'] == node_id:
                    inputs[conn['to']['input']] = results[conn['from']['node']]['output']
            results[node_id] = node.process(inputs)
        return results  # 修正：将 return 语句缩进到 execute 方法内

    def to_dict(self):
        return {
            "nodes": [node.to_dict() for node in self.nodes.values()],
            "connections": self.connections
        }