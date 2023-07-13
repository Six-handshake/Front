import ReactFlow, {
  MiniMap,
  useNodesState,
  useEdgesState, 
  Position} from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeTypes } from './const';
import { Node, Edge } from 'reactflow';
import { useEffect, useState } from 'react';
import { CardParent } from '../cards';
import { ContragentsDataType, getContragentsData } from '../../api';

type DataType = {
  nodes: Node[],
  edges: Edge[]
};

  const CardsBoard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (isLoading) {
        getContragentsData()
            .then((res) => {
                const convertedData = convertToClientData(res.data);
                setNodes(convertedData.nodes)
                setEdges(convertedData.edges)
                setIsLoading(false);
            });
    }
});
  return (
    <>    
      {!isLoading && <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        maxZoom={1.5}
        minZoom={0.55}
        edgeTypes={edgeTypes}
      >
      </ReactFlow>}
    </>
  );
};

const convertToClientData = (responseContragents: ContragentsDataType) => {
  const responseNodes = responseContragents.nodes;
  const responseEdges = responseContragents.edges;

  const convertedNodes : Node[] = responseNodes.map((node) => {
      const nodeType = node.type;
      const isLegalFace = nodeType === "legal_face";
      console.log('node.info.name', node.info.name)
      console.log('node.info.firstname', node.info.firstname)
      const title = node.info.name === undefined ? node.info.firstname : node.info.name;
      const convertedNode : Node = {
          id: node.id,
          type: 'default',
          style: {
              width: 300
          },
          data: {
              label: (<CardParent 
                  title={title} 
                  id={node.id} />)
          },
          position: {x: -900, y: 500},
          sourcePosition: Position.Left,
          targetPosition: Position.Right
      }        

      return convertedNode;
  })
  const convertedEdges : Edge[] = responseEdges.map((edge) => {
      const convertedEdge :Edge = {
          id: `${edge.child_id}-${edge.parent_id}`,
          source: edge.child_id,
          target: edge.parent_id
      }

      return convertedEdge;
  })

  const convertedData : DataType = {
      nodes: convertedNodes,
      edges: convertedEdges
  }

  return convertedData;
}

export {CardsBoard};