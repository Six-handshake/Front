import { ConvertedContragentsData } from '../shared/cardsBoard';
import { Node, Edge, Position } from 'reactflow';
import { ContragentsDataType } from '../api';

const convertData = (responseContragents: ContragentsDataType) => {
    const responseNodes = responseContragents.nodes;
    const responseEdges = responseContragents.edges;
  
    const convertedNodes : Node[] = responseNodes.map((node) => {
        const title = node.info.name === undefined ? node.info.firstname : node.info.name;
        const position = getNodePosition(node.depth_x, node.depth_y, node.is_child)
        const nodeType = node.is_child ? 'childNode' : 'parentNode';
        const data = node.is_child 
          ? { companyName: title, id: node.id, x: position.x, y: position.y, px:  node.depth_x, py: node.depth_y} 
          : { title: title, id: node.id, x: position.x, y: position.y, px: node.depth_x, py: node.depth_y }
  
    const convertedNode : Node = {
        id: node.id,
        draggable: false,
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
    const percent = edge.share !== 'None' ? `${edge.share}%` : '';
    const type = edge.share !== 'None' ? 'custom' : 'step';
    const convertedEdge: Edge = {
        id: `${edge.child_id}-${edge.parent_id}`,
        source: edge.parent_id,
        target: edge.child_id,
        type: type,
        data: {label: percent}
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
    const factorY = isChild ? -50 : 0;
    const factorX = isChild ? 0 : 250;
  
    return {x: cordinateX * 600 + factorX, y: cordinateY * 150 + factorY}
}

export {convertData};