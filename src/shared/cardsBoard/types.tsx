import{ Position } from 'reactflow';



type initialNodesType = {
    id: string,
    type?: string,
    data: {
        label?: React.ReactNode,
        selects?:{
            [key: string]: string            
        },
        
    },
    style?: {
        [key: string]:string | number,
    }
    className?: string,
    position: { x: number, y: number },
    sourcePosition?: Position,
    targetPosition?: Position,
    draggable?: boolean,
    selectable?: boolean,

}

export type {initialNodesType};