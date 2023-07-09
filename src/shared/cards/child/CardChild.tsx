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
            className=""
        >
            <Typography.Paragraph>{description}</Typography.Paragraph>
            {adress && <Typography.Paragraph>
                <CompassOutlined /> Адресс {adress}
            </Typography.Paragraph>}
            {phone && <Typography.Paragraph>
                <PhoneOutlined /> Телефон {phone}
            </Typography.Paragraph>}
        </Card>
    );
});

export { CardChild };
