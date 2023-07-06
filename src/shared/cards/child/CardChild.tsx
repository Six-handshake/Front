import { memo } from "react";
import { Card, Typography } from "antd";
import { CompassOutlined, PhoneOutlined } from "@ant-design/icons";
import { CardChildPropsType } from "./types";

const CardChild = memo<CardChildPropsType>(function CardChild({
    companyName,
    description,
    adress,
    phone,
}) {
    return (
        <Card
            title={companyName}
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
            className=""
        >
            <Typography.Paragraph>{description}</Typography.Paragraph>
            <Typography.Paragraph>
                <CompassOutlined /> Адресс {adress}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <PhoneOutlined /> Телефон {phone}
            </Typography.Paragraph>
        </Card>
    );
});

export { CardChild };
