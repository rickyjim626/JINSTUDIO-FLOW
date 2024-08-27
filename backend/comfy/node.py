class Node:
    def __init__(self, id, type, name, inputs=None, outputs=None, config=None):
        self.id = id
        self.type = type
        self.name = name
        self.inputs = inputs or []
        self.outputs = outputs or []
        self.data = {}
        self.config = config or {}

    def process(self, inputs):
        # 这里实现节点的处理逻辑
        return {"output": f"处理 {self.name} 的输入: {inputs}"}

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "inputs": self.inputs,
            "outputs": self.outputs,
            "data": self.data,
            "config": self.config
        }