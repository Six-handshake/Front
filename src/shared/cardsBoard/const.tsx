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
// const initialNodes : Node[]= [
//   {
//     id: '6',
//     type: 'default',
//     style: {
//       width: 300
//     },
//     data: {
//       label: (
//         <CardParent
//           title={'Елисеев Д.В'}
//           role={'Генеральный директор'}
//           id={'6'} 
//         />
//       ),
//     },
//     selectable: false,
//     position: { x: -900, y: 500 },
//     sourcePosition: Position.Left,
//     targetPosition: Position.Right
//   },
//   {
//     id: '7',
//     type: 'default',
//     style: {
//       width: 350,
//     },
//     data: {
//       label: (
//         <CardChild
//             companyName="Тензор"
//             adress="Максима Горького 24"
//             phone={'+79999999999'}
//             id="7"
//         />
//       ),
//     },
//     selectable: false,
//     position: { x: -1000, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Bottom
//   },
//   {
//     id: '8',
//     type: 'default',
//     style: {
//       width: 350
//     },
//     data: {
//       label: (
//         <CardChild
//             companyName="Тензор"
//             id="8"
//         />
//       ),
//     },
//     selectable: false,
//     position: { x: -550, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: '9',
//     type: 'default',
//     style: {
//       width: 350
//     },
//     data: {
//       label: (
//         <CardChild
//             companyName="Тензор"
//             id="9"
//         />
//       ),
//     },
//     selectable: false,
//     position: { x: -100, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: '10',
//     type: 'default',
//     style: {
//       width: 350
//     },
//     data: {
//       label: (
//         <CardChild
//             companyName="Тензор"
//             id="10"
//         />
//       ),
//     },
//     selectable: false,
//     position: { x: 350, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: '11',
//     type: 'default',
//     style: {
//       width: 350
//     },
//     data: {
//       label: (
//         <CardChild
//             companyName="Тензор"
//             id="11"
//         />
//       ),
//     },
//     selectable: false,
//     position: { x: 800, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: '12',
//     type: 'default',
//     style: {
//       width: 350
//     },
//     data: {
//       label: (
//         <CardChild
//             companyName="Тензор"
//             id="9"
//         />
//       ),
//     },
//     selectable: false,
    
//     position: { x: 1250, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
// ];

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