import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType, Position, Connection, Edge
} from 'reactflow';
import 'reactflow/dist/style.css';

type initialNodesType = {
    id: string,
    type?: string,
    data: {
        label?: React.ReactNode,
        selects?:{
            [key: string]: string            
        },
        
    },
    style?: {
        [key: string]:string | number,
    }
    className?: string,
    position: { x: number, y: number },
    sourcePosition?: Position,
    targetPosition?: Position,
    draggable?: boolean,
    selectable?: boolean,

}
const initialNodes : initialNodesType[]= [
    {
      id: '1',
      type: 'input',
      data: {
        label: 'Input Node',
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      data: {
        label: 'Default Node',
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '3',
      type: 'output',
      data: {
        label: 'Output Node',
      },
      position: { x: 400, y: 100 },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 100, y: 200 },
      data: {
        selects: {
          'handle-0': 'smoothstep',
          'handle-1': 'smoothstep',
        },
      },
    },
    {
      id: '5',
      type: 'output',
      data: {
        label: 'custom style',
      },
      className: 'circle',
      style: {
        background: '#2B6CB0',
        color: 'white',
      },
      position: { x: 400, y: 200 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    {
      id: '6',
      type: 'output',
      style: {
        background: '#63B3ED',
        color: 'white',
        width: 100,
      },
      data: {
        label: 'Node',
      },
      position: { x: 400, y: 325 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    {
      id: '7',
      type: 'default',
      className: 'annotation',
      data: {
        label: (
          <>
            On the bottom left you see the <strong>Controls</strong> and the bottom right the{' '}
            <strong>MiniMap</strong>. This is also just a node 🥳
          </>
        ),
      },
      draggable: false,
      selectable: false,
      position: { x: 150, y: 400 },
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      type: 'smoothstep',
      sourceHandle: 'handle-0',
      data: {
        selectIndex: 0,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'e4-6',
      source: '4',
      target: '6',
      type: 'smoothstep',
      sourceHandle: 'handle-1',
      data: {
        selectIndex: 1,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ];

const minimapStyle = {
  height: 120,
};

const CardBoard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      attributionPosition="top-right"
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default CardBoard;