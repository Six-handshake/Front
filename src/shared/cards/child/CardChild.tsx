import { memo } from "react";
import { Card, Typography } from "antd";
import { CompassOutlined, PhoneOutlined } from "@ant-design/icons";
import { CardChildPropsType } from "./types";
import { Handle, Position } from "reactflow";

const CardChild = memo<CardChildPropsType>(function CardChild({
    data
}) {
    return (
        <Card
            title={data.companyName}
            extra={<a href="#">More</a>}
            className=""
        >
            <Handle type='source' position={Position.Top}/>
            
            <Typography.Paragraph>{data.description}</Typography.Paragraph>
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
