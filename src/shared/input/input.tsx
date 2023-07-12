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
    function InputKonterAgent({...props}) {
        const TodosContext = React.createContext({
            todos: {
                firstname: "",
                lastname: "",
                patronymic: "",
                inn: "",
            },
            fetchTodos: () => {return undefined},
        });

        const [firstAgent, setItem] = React.useState("");
        const [secondAgent, setItemSec] = React.useState("");

        const { todos, fetchTodos } = React.useContext(TodosContext);

        const handleInputfirstAg = (event : React.ChangeEvent<HTMLInputElement>) => {
            setItem(event.target.value);
        };
        const handleInputsecAg = (event: React.ChangeEvent<HTMLInputElement>) => {
            setItemSec(event.target.value);
        };
        const handleSubmit = () => {
            const newTodo = {
                index1: firstAgent,
                index2: secondAgent,
            };

            fetch("/api/find", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo),
            }).then(fetchTodos);
        };
        // const onFinish = (value: object) => {
        //     console.log(value);
        // };

        return (
            <Form
                name="form_item_path"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <MyFormItemGroup prefix={["user"]}>
                    <MyFormItemGroup prefix={["name"]}>
                        <MyFormItem
                            name="firstName"
                            label="Введите первого контрагента"
                            rules={[{ required: true }]}
                        >
                            <Input onChange={handleInputfirstAg} />
                        </MyFormItem>
                        <MyFormItem
                            name="secondName"
                            label="Введите второго контрагента"
                        >
                            <Input onChange={handleInputsecAg} />
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
                <div>
                    <div>
                        <div>{todos.firstname}</div>
                        <div>{todos.lastname}</div>
                        <div>{todos.patronymic}</div>
                        <div>{todos.inn}</div>
                    </div>
                </div>
            </Form>
        );
    }
);

export { InputKonterAgent };
