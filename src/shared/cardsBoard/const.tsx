import { MarkerType, Position, Node, Edge, EdgeTypes } from 'reactflow';
import { CardChild, CardParent } from '../cards';
import { PercentContainer } from '../../UI';

const initialNodes : Node[]= [
  {
    id: '6',
    type: 'default',
    style: {
      width: 300
    },
    data: {
      label: (
        <CardParent
          title={'Елисеев Д.В'}
          role={'Генеральный директор'}
          id={'6'} 
        />
      ),
    },
    selectable: false,
    position: { x: -900, y: 500 },
    sourcePosition: Position.Left,
    targetPosition: Position.Right
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
  },
  { 
    id: 'e1-4', 
    source: '6', 
    target: '7',
    type: 'step'
  },
  { 
    id: 'e1-4', 
    source: '8', 
    target: '9',
    type: 'step'
  }
];

const edgeTypes: EdgeTypes = {
  custom: PercentContainer,
};

export {initialEdges, initialNodes, edgeTypes};