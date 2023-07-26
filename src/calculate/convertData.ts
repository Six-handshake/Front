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
        const info = node.is_child 
            ? {lastName: node.info.lastname, firstName: node.info.firstname, inn: node.info.inn}
            : {inn: node.info.inn, dataReg: node.info.reg_date, 
                okved: node.info.okved, profit: node.info.profit,
                 revenue: node.info.revenue, region: node.info.region}

        const data = { title: title, id: node.id, info: info }
        // const data = node.is_child 
        //   ? { title: title, id: node.id, info: info } 
        //   : { title: title, id: node.id, info: info }
  
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
    const percent = edge.share !== 'None' ? `${Number(edge.share).toFixed(1)}%` : '';
    const type = edge.share !== 'None' ? 'custom' : 'step';
    const convertedEdge: Edge = {
        id: `${edge.child_id}-${edge.parent_id}`,
        source: edge.parent_id,
        target: edge.child_id,
        type: type,
        data: {label: percent, betweenDeep: edge.between_depth}
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
  
    return {x: cordinateX * 700 + factorX, y: cordinateY * 150 + factorY}
}

export {convertData};