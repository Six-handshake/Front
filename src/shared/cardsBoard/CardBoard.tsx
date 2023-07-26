import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState} from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeTypes, nodeTypes } from './const';
import { useEffect, useState } from 'react';
import { ContragentsDataType, getContragentsData } from '../../api';
import useData from '../../store/useStore';
import { convertData } from '../../calculate';

  const CardsBoard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const storeNodes = useData((state) => state.nodes);
    const storeEdges = useData((state) => state.edges);

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

useEffect(() => {
  const contragentsData : ContragentsDataType = {edges: storeEdges, nodes: storeNodes}
  const convertedData = convertData(contragentsData);
  setNodes(convertedData.nodes)
  setEdges(convertedData.edges)
  
}, [storeEdges, storeNodes]);

  return (
    <> 
    <div style={{fontSize: '32px', textAlign: 'center'}}>Визуализация связей контрагентов</div>  
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
            // gap={16}
            style={{borderTop: '1px solid black'}}
            />
        </ReactFlow>}
    </>
  );
};




export {CardsBoard};