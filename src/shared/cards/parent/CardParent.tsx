import { memo } from "react";
import { Card } from "antd";
import { CardParentPropsType } from "./types";
import { Handle, Position } from "reactflow";

const CardParent = memo<CardParentPropsType>(function CardParent({
    data
}) {
    return (
        <Card
            size={'small'}
            className=""
            style={{background: 'lightgray'}}            
        >
            {/* <Handle type='target' position={Position.Top}/> */}
            <p>
                {`${data.title} `}
            </p>
            <Handle type='source' position={Position.Left}/>
        </Card>
    );
});

export { CardParent };
