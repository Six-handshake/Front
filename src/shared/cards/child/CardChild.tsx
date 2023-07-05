import { memo } from "react";

import { CardChildPropsType } from "./types";

const CardChild = memo<CardChildPropsType>(function CardChild({}) {
    return <div></div>;
});

export { CardChild };
