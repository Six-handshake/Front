import { MarkerType, Position, Node, Edge, EdgeTypes } from 'reactflow';
import { CardChild } from '../cards';
import { PercentContainer } from '../../UI';

const initialNodes : Node[]= [
  {
    id: '7',
    type: 'default',
    style: {
      width: 400,
    },
    data: {
      label: (
        <CardChild
            companyName="Тензор"
            adress="Максима Горького 24"
            phone={'+79999999999'}
            id="2"
        />
      ),
    },
    selectable: false,
    position: { x: -1000, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Bottom
  },
  {
    id: '8',
    type: 'default',
    style: {
      width: 400
    },
    data: {
      label: (
        <CardChild
            companyName="Тензор"
            id="2"
        />
      ),
    },
    selectable: false,
    position: { x: -500, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges : Edge[] = [
  { id: 'e1-3', source: '7', target: '8', 
    data: {
      label: '80%'
    },
    type: 'custom', 
    markerEnd: {
      type: MarkerType.ArrowClosed,
    }
  }
];

const edgeTypes: EdgeTypes = {
  custom: PercentContainer,
};

export {initialEdges, initialNodes, edgeTypes};