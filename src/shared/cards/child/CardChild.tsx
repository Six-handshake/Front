import { memo } from "react";
import { Card, Typography } from "antd";
import { CompassOutlined, PhoneOutlined, BranchesOutlined } from "@ant-design/icons";
import { CardChildPropsType } from "./types";
import { Handle, Position } from "reactflow";

const CardChild = memo<CardChildPropsType>(function CardChild({
    data
}) {
    return (
        <Card
            title={data.companyName}
            extra={<BranchesOutlined />}
            className=""
            bodyStyle={{background: 'grey', color: 'white'}}
            headStyle={{background: 'grey', color: 'white'}}>
            <Handle type='source' position={Position.Left}/>
            
            <Typography.Paragraph>{`${data.description} x${data.x} y${data.y} px${data.px} py${data.py}`}</Typography.Paragraph>
            {data.adress && <Typography.Paragraph>
                <CompassOutlined /> Адресс {data.adress}
            </Typography.Paragraph>}
            {data.phone && <Typography.Paragraph>
                <PhoneOutlined /> Телефон {data.phone}
            </Typography.Paragraph>}
            <Handle type='target' position={Position.Bottom}/>
        </Card>
    );
});

export { CardChild };
