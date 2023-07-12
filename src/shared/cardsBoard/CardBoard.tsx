import ReactFlow, {
  MiniMap,
  useNodesState,
  useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { initialNodes, initialEdges, edgeTypes } from './const';

const minimapStyle = {
  height: 120,
};

const CardsBoard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      edgeTypes={edgeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable/>
    </ReactFlow>
  );
};

export {CardsBoard};