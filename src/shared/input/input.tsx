import React, { memo } from "react";
import { Form, Input, Button } from "antd";
import type { FormItemProps } from "antd";

import { InputKonterAgentPropsType, MyFormItemGroupPropsType } from "./types";
import { findRelationship } from "../../api";
import { FindRelationshipType } from "../../api/types";
import useStore from "../../store/store";

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

    return <Form.Item className="w-1/3" name={concatName} {...props} />;
};

const InputKonterAgent = memo<InputKonterAgentPropsType>(
    function InputKonterAgent({...props}) {
        const setNodes = useStore((state) => state.setNodes)
        const setEdges = useStore((state) => state.setEdges)

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

        const handleSubmit = async() => {
            const firstContragent = {data: firstAgent, isPerson: true, isCompany: true}
            const secondContragent = {data: secondAgent, isPerson: true, isCompany: true}
            const header : FindRelationshipType = {
                firstContragent: firstContragent, 
                secondContragent: secondContragent
            };

            const response = await findRelationship(header);
            // fetch("/api/find", {//
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(newTodo),
            // }).then(fetchTodos);
            setNodes(response.data.nodes)
            setEdges(response.data.edges)
        };

        return (
            <Form
                name="form_item_path"
                layout="vertical"
                onFinish={handleSubmit}                
            >
                    <div className='flex justify-between'>
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
                    </div>
                <Button
                    type="primary"
                    htmlType="submit"
                    className=" bg-blue-600 ml-auto flex"
                >
                    Найти
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
