import React, { memo } from "react";
import { Form, Input, Button } from "antd";
import type { FormItemProps } from "antd";

import { InputKonterAgentPropsType, MyFormItemGroupPropsType } from "./types";

const MyFormItemContext = React.createContext<(string | number)[]>([]);

function toArr(
    str: string | number | (string | number)[]
): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupPropsType) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(
        () => [...prefixPath, ...toArr(prefix)],
        [prefixPath, prefix]
    );

    return (
        <MyFormItemContext.Provider value={concatPath}>
            {children}
        </MyFormItemContext.Provider>
    );
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName =
        name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
};

const InputKonterAgent = memo<InputKonterAgentPropsType>(
    function InputKonterAgent({}) {
        const onFinish = (value: object) => {
            console.log(value);
        };

        return (
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <MyFormItemGroup prefix={["user"]}>
                    <MyFormItemGroup prefix={["name"]}>
                        <MyFormItem
                            name="firstName"
                            label="Введите первого контрагента"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </MyFormItem>
                        <MyFormItem
                            name="secondName"
                            label="Введите второго контрагента"
                        >
                            <Input />
                        </MyFormItem>
                    </MyFormItemGroup>
                </MyFormItemGroup>

                <Button
                    type="primary"
                    htmlType="submit"
                    className=" bg-blue-600"
                >
                    Submit
                </Button>
            </Form>
        );
    }
);

export { InputKonterAgent };
