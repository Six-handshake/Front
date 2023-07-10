import { memo } from "react";
import { Card } from "antd";
import { CardParentPropsType } from "./types";

const CardParent = memo<CardParentPropsType>(function CardParent({
    role,
    title
}) {
    return (
        <Card
            size={'small'}
            className=""
            style={{background: 'lightgray'}}            
        >
            <p>
                {`${title} `}
                <b>{role}</b>
            </p>
        </Card>
    );
});

export { CardParent };
