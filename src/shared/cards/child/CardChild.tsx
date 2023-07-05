import { memo } from "react";
import { Card, Typography } from "antd";
import { CompassOutlined, PhoneOutlined } from "@ant-design/icons";
import { CardChildProps } from "./types";

const CardChild = memo<CardChildProps>(
    function CardChild({companyName, description, adress}) {
        return( 
        <Card title={companyName} extra={<a href="#">More</a>} style={{ width: 300 }} className='m-4'>
            <Typography.Paragraph>{description}</Typography.Paragraph>
            <Typography.Paragraph><CompassOutlined /> Адресс {adress}</Typography.Paragraph>
            <Typography.Paragraph><PhoneOutlined /> Телефон</Typography.Paragraph>
        </Card>);
});

export { CardChild };
