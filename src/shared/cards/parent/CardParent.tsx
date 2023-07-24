import { memo } from "react";
import { Card } from "antd";
import { CardParentPropsType } from "./types";
import { Handle, Position } from "reactflow";
import { IdcardOutlined } from "@ant-design/icons";

const CardParent = memo<CardParentPropsType>(function CardParent({
    data
}) {
    return (
        <Card
            size={'small'}
            className=""
            style={{background: '#1677ff'}}            
            >
            <Handle type='target' position={Position.Right}/>
            <p className="text-white flex gap-2 flex-row items-center">
                <IdcardOutlined className="text-black " style={{fontSize: '28px'}}/><p>{`${data.title} x${data.x} y${data.y} id${data.id}`}</p>
            </p>
            <Handle type='source' position={Position.Left}/>
        </Card>
    );
});

export { CardParent };
