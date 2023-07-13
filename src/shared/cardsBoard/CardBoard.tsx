import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState, 
  Position} from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeTypes, nodeTypes } from './const';
import { Node, Edge } from 'reactflow';
import { useEffect, useState } from 'react';
import { CardChild, CardParent } from '../cards';
import { ContragentsDataType, getContragentsData } from '../../api';
import { ConvertedContragentsData } from '.';

  const CardsBoard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (isLoading) {
        getContragentsData()
            .then((res) => {
                const convertedData = convertData(res.data);
                setNodes(convertedData.nodes)
                setEdges(convertedData.edges)
                setIsLoading(false);
            });
    }
});

  return (
    <>    
      {!isLoading && 
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          maxZoom={1.5}
          minZoom={0.55}
          edgeTypes={edgeTypes}  
          nodeTypes={nodeTypes}        
        >
          <Background 
            color='#ccc' 
            style={{borderTop: '1px solid black'}}
            />
        </ReactFlow>}
    </>
  );
};

const convertData = (responseContragents: ContragentsDataType) => {
  const responseNodes = responseContragents.nodes;
  const responseEdges = responseContragents.edges;

  const convertedNodes : Node[] = responseNodes.map((node) => {
      const title = node.info.name === undefined ? node.info.firstname : node.info.name;
      // const label = node.is_child 
      //                 ? <CardChild companyName={title} id={node.id} />
      //                 : <CardParent title={title} id={node.id} />
      const position = getNodePosition(node.depth_x, node.depth_y, node.is_child)
      const nodeType = node.is_child ? 'childNode' : 'parentNode';
      const data = node.is_child ? { companyName: title, id: node.id } : { title: title, id: node.id }

      const convertedNode : Node = {
          id: node.id,
          type: nodeType,
          style: {
              width: 300
          },
          data: data,
          position: position,
          sourcePosition: Position.Left,
          targetPosition: Position.Bottom
      }        

      return convertedNode;
  })
  
  const convertedEdges : Edge[] = responseEdges.map((edge) => {
      const convertedEdge :Edge = {
          id: `${edge.child_id}-${edge.parent_id}`,
          source: edge.parent_id,
          target: edge.child_id,
          type: 'step'
      }

      return convertedEdge;
  })

  const convertedData : ConvertedContragentsData = {
      nodes: convertedNodes,
      edges: convertedEdges
  }

  return convertedData;
}

const getNodePosition = (cordinateX : number, cordinateY: number, isChild: boolean) => {
  const factorY = isChild ? 50 : 0;
  const factorX = isChild ? 0 : 175;

  return {x: cordinateX * 500 + factorX, y: cordinateY * 150 - factorY}
}

export {CardsBoard};