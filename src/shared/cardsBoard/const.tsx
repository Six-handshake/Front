import { MarkerType, Position } from 'reactflow';
import { initialNodesType } from './types';
import { CardChild } from '../cards';

const initialNodes : initialNodesType[]= [
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

const initialEdges = [
  { id: 'e1-3', source: '7', target: '8', label: '80%', 
    markerEnd: {
      type: MarkerType.ArrowClosed,
    }
  }
];

export {initialEdges, initialNodes};