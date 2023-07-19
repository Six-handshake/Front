import React, { memo } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import type { FormItemProps } from "antd";
import { InputKonterAgentPropsType, MyFormItemGroupPropsType } from "./types";
import { findRelationship } from "../../api";
import { FindRelationshipType } from "../../api/types";
import useStore from "../../store/store";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import { convertData } from "../../calculate";
import { Node, Edge } from "../../api";
import { notification } from "antd";

const MyFormItemContext = React.createContext<(string | number)[]>([]);
const options = [
    { label: 'Кампаниям', value: 'Company' },
    { label: 'Людям', value: 'People' },
  ];


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

        const [firstAgent, setItem] = useState("");
        const [secondAgent, setItemSec] = useState("");
        const [firstFilters, setFirstFilters] = useState<CheckboxValueType[]>(['Company', 'People']);
        const [secondFilters, setSecondFilters] = useState<CheckboxValueType[]>(['Company', 'People']);

        const { todos, fetchTodos } = React.useContext(TodosContext);

        const handleInputfirstAg = (event : React.ChangeEvent<HTMLInputElement>) => {
            setItem(event.target.value);
        };
        const handleInputsecAg = (event: React.ChangeEvent<HTMLInputElement>) => {
            setItemSec(event.target.value);
        };

        const handleSubmit = async() => {
            const firstContragent = {
                data: firstAgent, 
                isPerson: firstFilters.includes('People'), 
                isCompany: firstFilters.includes('Company')
            }
            const secondContragent = {
                data: secondAgent, 
                isPerson: secondFilters.includes('People'), 
                isCompany: secondFilters.includes('Company')
            }

            const header : FindRelationshipType = {
                firstContragent: firstContragent, 
                secondContragent: secondContragent
            };

            const response = await findRelationship(header); 
            response
                .then(() => {
                    setNodes(response.nodes)
                    setEdges(response.edges)
                })
        };

        const onChangeFirstCheckboxes = (checkedValues: CheckboxValueType[]) => {
            setFirstFilters(checkedValues);
        };
        
        const onChangeSecondCheckboxes = (checkedValues: CheckboxValueType[]) => {
            setSecondFilters(checkedValues);
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
                                    // rules={[{ required: true }]}
                                >
                                    <Input onChange={handleInputfirstAg} />
                                    <div>Искать по: <Checkbox.Group options={options} defaultValue={firstFilters} onChange={onChangeFirstCheckboxes}/></div>
                                </MyFormItem>
                                <MyFormItem
                                    name="secondName"
                                    label="Введите второго контрагента"
                                >
                                    <Input onChange={handleInputsecAg} />
                                    <div>Искать по: <Checkbox.Group options={options} defaultValue={secondFilters} onChange={onChangeSecondCheckboxes}/></div>
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
