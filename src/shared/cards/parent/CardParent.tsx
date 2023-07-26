import { memo } from "react";
import { Card, Typography } from "antd";
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
            <Handle type='target' position={Position.Right} hidden/>
            <div className="text-white flex gap-2 flex-row items-center">
                <IdcardOutlined className="text-white " style={{fontSize: '32px'}}/>
                {/* <Typography.Paragraph style={{fontSize: 'x-large', color: 'white', margin: 'auto'}}>{`${data.title} x${data.x} y${data.y} id${data.id}`}</Typography.Paragraph> */}
                <Typography.Paragraph style={{fontSize: 'large', color: 'white', margin: 'auto 0'}}>{`${data.title}`}</Typography.Paragraph>
            </div>
            <Handle type='source' position={Position.Left} hidden/>
        </Card>
    );
});

export { CardParent };
