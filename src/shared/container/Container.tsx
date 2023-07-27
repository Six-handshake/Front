import { memo } from "react";
import { ContainerPropsType } from "./types";

const Container = memo<ContainerPropsType>(function Container({ children }) {
    return <div className=" mx-8 pt-8">{children}</div>;
});

export { Container };
