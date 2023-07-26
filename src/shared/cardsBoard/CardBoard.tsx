import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background} from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeTypes, nodeTypes } from './const';
import { useEffect, useState } from 'react';
import { ContragentsDataType } from '../../api';
import useData from '../../store/useStore';
import { convertData } from '../../calculate';

  const CardsBoard = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const storeNodes = useData((state) => state.nodes);
    const storeEdges = useData((state) => state.edges);
    const [updatingKey, setUpdatingKey] = useState(0);

useEffect(() => {
  const contragentsData : ContragentsDataType = {edges: storeEdges, nodes: storeNodes}
  const convertedData = convertData(contragentsData);
  setNodes(convertedData.nodes);  
  setEdges(convertedData.edges);
  setUpdatingKey(prev => prev + 1) 

}, [setEdges, setNodes, storeEdges, storeNodes]);

  return (
    <> 
      <div style={{fontSize: '32px', textAlign: 'center', borderBottom: '1px solid black'}}>Визуализация связей контрагентов</div>  
      {
        <ReactFlow
        defaultViewport={{x: 50, y: 50, zoom: 0.5}}
        key={updatingKey}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        maxZoom={2.5}
        minZoom={0.45}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes} >
        </ReactFlow>
      }        
    </>
  );
};

export {CardsBoard};