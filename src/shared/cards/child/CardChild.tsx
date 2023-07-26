import { memo, useState } from "react";
import { Card, Typography } from "antd";
import { CompassOutlined, PhoneOutlined, BranchesOutlined } from "@ant-design/icons";
import { CardChildPropsType } from "./types";
import { Handle, Position } from "reactflow";

const CardChild = memo<CardChildPropsType>(function CardChild({
    data
}) {
    const [isSwitched, setIsSwitched] = useState(false);
    const {inn,
        dataReg, 
        okved, 
        profit,
        revenue,
        region} = data.info;

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsSwitched(prev => !prev)
    }

    return (
        <>
            {<Card            
                title={data.title}
                extra={<BranchesOutlined style={{color: 'white'}}/>}
                className=""
                onClick={handleCardClick}
                style={{background: '#2dc7cc', color: 'white', fontSize: 'large', minHeight: '150px', cursor: 'pointer'}}
                headStyle={{background: '#2dc7cc', color: 'white', fontSize: 'x-large'}}>
                <Handle type='source' position={Position.Left} hidden/>
                    <Typography.Paragraph style={{color: 'white', fontSize: 'large'}}>{`${inn}`}</Typography.Paragraph>
                    <Handle type='target' position={Position.Bottom} hidden/>
            </Card>}
        
        </>
    );
});

export { CardChild };
