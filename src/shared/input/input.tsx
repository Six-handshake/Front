import React, { memo, useState } from "react";
import {
    Form,
    Button,
    Checkbox,
    FormItemProps,
    Select,
    SelectProps,
    notification,
} from "antd";
import { InputKonterAgentPropsType, MyFormItemGroupPropsType } from "./types";
import { findRelationship, findCoincidence } from "../../api";
import {
    FindRelationshipType,
    FindCoincidenceType,
    FindCoincindeceRequestType,
} from "../../api/types";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { InputFirstFilters, InputSecondFilters } from "../inputFilters";
import useStore from "../../store/useStore";
import FormItem from "antd/es/form/FormItem";

const MyFormItemContext = React.createContext<(string | number)[]>([]);
const flagsOptions = [
    { label: "Компаниям", value: "Company" },
    { label: "Людям", value: "People" },
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
    function InputKonterAgent({ ...props }) {
        const setNodes = useStore((state) => state.setNodes);
        const setEdges = useStore((state) => state.setEdges);

        const [firstAgent, setFirstAgent] = useState("");
        const [secondAgent, setSecondAgent] = useState("");

        // const [firstFilters, setFirstFilters] = useState<CheckboxValueType[]>(['Company', 'People']);
        // const [secondFilters, setSecondFilters] = useState<CheckboxValueType[]>(['Company', 'People']);
        const firstFilters = useStore((state) => state.firstFilters);
        const setFirstFilters = useStore((state) => state.setFirstFilters);
        const secondFilters = useStore((state) => state.secondFilters);
        const setSecondFilters = useStore((state) => state.setSecondFilters);

        const [firstCoincidenceList, setFirstCoincidenceList] = useState<
            SelectProps["options"]
        >([]);
        const [isFirstSelectOpen, setIsFirstSelectOpen] = useState(false);

        const [secondCoincidenceList, setSecondCoincidenceList] = useState<
            SelectProps["options"]
        >([]);
        const [isSecondSelectOpen, setIsSecondSelectOpen] = useState(false);

        const handleOnSearchFirstAgent = async (value: string) => {
            if (value.length > 2) {
                const request: FindCoincidenceType = {
                    text: value,
                    is_person: firstFilters.includes("People"),
                    is_company: firstFilters.includes("Company"),
                    regions: [],
                };
                await findCoincidence(request).then((res) => {
                    const data: FindCoincindeceRequestType[] = res;

                    const convertedData = data.map((el) => {
                        return { value: el.text, label: el.text };
                    });

                    setFirstCoincidenceList(convertedData);
                    if (convertedData.length > 0) {
                        setIsFirstSelectOpen(true);
                    }
                });
                // const list = ['list','list','list']
                // const responseList = findUniq(list)
                setIsFirstSelectOpen(true);
                // setFirstCoincidenceList(responseList)
                // console.log('responseList', responseList);
            } else {
                setFirstCoincidenceList([]);
            }
        };

        const handleOnSearchSecondAgent = async (value: string) => {
            // setSecondAgent(value);
            if (value.length > 2) {
                const request: FindCoincidenceType = {
                    text: value,
                    okved: [],
                    regions: [],
                    is_person: secondFilters.includes("People"),
                    is_company: secondFilters.includes("Company"),
                };
                await findCoincidence(request).then((res) => {
                    const data: FindCoincindeceRequestType[] = res;

                    const convertedData = data.map((el) => {
                        return { value: el.text, label: el.text };
                    });

                    setSecondCoincidenceList(() => [...convertedData]);
                    if (convertedData.length > 0) {
                        setIsSecondSelectOpen(true);
                    }
                });
            }
        };

        const handleSubmit = async () => {
            const firstContragent = {
                data: firstAgent,
                isPerson: firstFilters.includes("People"),
                isCompany: firstFilters.includes("Company"),
            };
            const secondContragent = {
                data: secondAgent,
                isPerson: secondFilters.includes("People"),
                isCompany: secondFilters.includes("Company"),
            };

            const header: FindRelationshipType = {
                firstContragent: firstContragent,
                secondContragent: secondContragent,
            };

            const response = findRelationship(header);
            response
                .then((response) => {
                    setNodes(response.data.nodes);
                    setEdges(response.data.edges);
                })
                .catch((err) => {
                    notification.error({ message: "Связи не найдены" });
                });
            // .then(() => {
            //     console.log('response', response)
            //     setNodes(response.nodes)
            //     setEdges(response.edges)
            // })
            console.log("response", response);
        };

        const onChangeFirstCheckboxes = (
            checkedValues: CheckboxValueType[]
        ) => {
            setFirstFilters(checkedValues);
        };

        const onChangeSecondCheckboxes = (
            checkedValues: CheckboxValueType[]
        ) => {
            setSecondFilters(checkedValues);
        };

        const onEnterKeyDownHandler = (
            e: React.KeyboardEvent<HTMLDivElement>
        ) => {
            if (e.key === "Enter") {
                setIsFirstSelectOpen(false);
                setIsSecondSelectOpen(false);
            }
        };

        const onFirstFieldFocus = () => {
            const isOpen = secondAgent.length > 2;
            setIsFirstSelectOpen(isOpen);
            // if(firstAgent.length > 2){
            // }
        };

        const onFirstFieldBlur = () => {
            setIsFirstSelectOpen(false);
        };

        const onSecondFieldFocus = () => {
            const isOpen = secondAgent.length > 2;
            setIsSecondSelectOpen(isOpen);
        };

        const onSecondFieldBlur = () => {
            setIsSecondSelectOpen(false);
        };

        const onFirstFieldChange = (value: string) => {
            setFirstAgent(value);
        };

        const onSecondFieldChange = (value: string) => {
            setSecondAgent(value);
        };

        return (
            <Form
                name="form_item_path"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <div className="flex justify-between">
                    <MyFormItemGroup prefix={["user"]}>
                        <MyFormItemGroup prefix={["name"]}>
                            <MyFormItem
                                name="firstAgent"
                                label="Введите первого контрагента"
                                // rules={[{ required: true }]}
                            >
                                <Select
                                    onKeyDown={onEnterKeyDownHandler}
                                    open={isFirstSelectOpen}
                                    showSearch
                                    placeholder="Введите контрагента"
                                    optionFilterProp="children"
                                    onChange={onFirstFieldChange}
                                    onSearch={handleOnSearchFirstAgent}
                                    onFocus={onFirstFieldFocus}
                                    onBlur={onFirstFieldBlur}
                                    className="my-2"
                                >
                                    {firstCoincidenceList &&
                                        firstCoincidenceList.map((opt) => (
                                            <Select.Option
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </Select.Option>
                                        ))}
                                </Select>
                                <FormItem>
                                    <InputFirstFilters />
                                </FormItem>
                                <div className=" -mt-4">
                                    Искать по:{" "}
                                    <Checkbox.Group
                                        options={flagsOptions}
                                        defaultValue={firstFilters}
                                        onChange={onChangeFirstCheckboxes}
                                    />
                                </div>
                            </MyFormItem>
                            <MyFormItem
                                name="secondAgent"
                                label="Введите второго контрагента"
                            >
                                <Select
                                    onKeyDown={onEnterKeyDownHandler}
                                    open={isSecondSelectOpen}
                                    showSearch
                                    placeholder="Введите второго контрагента"
                                    optionFilterProp="children"
                                    onSearch={handleOnSearchSecondAgent}
                                    onFocus={onSecondFieldFocus}
                                    onBlur={onSecondFieldBlur}
                                    onChange={onSecondFieldChange}
                                    className="my-2"
                                >
                                    {secondCoincidenceList &&
                                        secondCoincidenceList.map((opt) => (
                                            <Select.Option
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </Select.Option>
                                        ))}
                                </Select>
                                <FormItem>
                                    <InputSecondFilters />
                                </FormItem>
                                <div className="-mt-4">
                                    Искать по:{" "}
                                    <Checkbox.Group
                                        options={flagsOptions}
                                        defaultValue={secondFilters}
                                        onChange={onChangeSecondCheckboxes}
                                    />
                                </div>
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
            </Form>
        );
    }
);

function findUniq(a: string[]) {
    const seen: { [key: string]: number } = {};
    const out = [];
    let j = 0;
    for (let i = 0; i < a.length; i++) {
        const item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}

export { InputKonterAgent };
