class Node:
    def __init__(self, id, type, name, inputs=None, outputs=None):
        self.id = id
        self.type = type
        self.name = name
        self.inputs = inputs or []
        self.outputs = outputs or []
        self.data = {}

    def process(self):
        # 这里应该实现节点的处理逻辑
        pass

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "inputs": self.inputs,
            "outputs": self.outputs,
            "data": self.data
        }
