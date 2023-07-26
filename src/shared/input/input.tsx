import React, { memo, useState } from "react";
import { Form, Button, Checkbox, FormItemProps, Select, SelectProps, notification } from "antd";
import { InputKonterAgentPropsType, MyFormItemGroupPropsType, ConvertedCoincidencesType } from "./types";
import { findRelationship, findCoincidence, FindRelationshipType, FindCoincidenceType, FindCoincindeceRequestType } from "../../api";
// import { FindRelationshipType, FindCoincidenceType, FindCoincindeceRequestType } from "../../api/types";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { InputFirstFilters, InputSecondFilters } from "../inputFilters";
import { SearchOutlined } from "@ant-design/icons";
import useStore from "../../store/useStore";

const MyFormItemContext = React.createContext<(string | number)[]>([]);
const flagsOptions = [
    { label: 'компании', value: 'Company' },
    { label: 'люди', value: 'People' },
];

function toArr(
    str: string | number | (string | number)[]
) : (string | number)[] {
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

        const firstOkved = useStore((state) => state.firstActivities);
        const secondOkved = useStore((state) => state.secondActivities);

        const firstRegions = useStore((state) => state.firstRegions)
        const secondRegions = useStore((state) => state.secondRegions)

        const [firstAgent, setFirstAgent] = useState("");
        const [secondAgent, setSecondAgent] = useState("");
        
        const firstFilters = useStore(state => state.firstFilters);
        const setFirstFilters = useStore(state => state.setFirstFilters);
        const secondFilters = useStore(state => state.secondFilters);
        const setSecondFilters = useStore(state => state.setSecondFilters);

        const [firstCoincidenceList, setFirstCoincidenceList] = useState<SelectProps['options']>([]);
        const [isFirstSelectOpen, setIsFirstSelectOpen] = useState(false);

        const [secondCoincidenceList, setSecondCoincidenceList] = useState<SelectProps['options']>([]);        
        const [isSecondSelectOpen, setIsSecondSelectOpen] = useState(false);

        const handleOnSearchFirstAgent = async (value: string) => {
            if(value.length > 2){
                const request : FindCoincidenceType = {
                    text: value,
                    is_person: firstFilters.includes('People'), 
                    is_company: firstFilters.includes('Company'), 
                    regions: firstRegions,
                    okved: firstOkved
                } 
                await findCoincidence(request)
                    .then(res => {
                        const data : FindCoincindeceRequestType[] = res;
                        
                        const convertedData : ConvertedCoincidencesType[] = data
                            .map((el) => {
                                return {value: el.text, label: el.text};
                            })
                        
                            const uniqueList = findUniq(convertedData);

                            setFirstCoincidenceList(uniqueList)
                            if(uniqueList.length > 0){
                                setIsFirstSelectOpen(true)
                            }
                        })
                setIsFirstSelectOpen(true)
            }
            else{
                setFirstCoincidenceList([]);
            }
        };

        const handleOnSearchSecondAgent = async (value: string) => {
            if(value.length > 2){
                const request : FindCoincidenceType = {
                    text: value,
                    okved: secondOkved,
                    regions: secondRegions,
                    is_person: secondFilters.includes('People'), 
                    is_company: secondFilters.includes('Company'), 
                } 
                await findCoincidence(request)
                    .then(res => {
                        const data : FindCoincindeceRequestType[] = res;
                        
                        const convertedData = data
                            .map((el) => {
                                return {value: el.text, label: el.text};
                            })

                        const uniqueList = findUniq(convertedData);
                        
                        setSecondCoincidenceList(uniqueList)
                        if(uniqueList.length > 0){
                            setIsSecondSelectOpen(true)
                        }
                    })
            }
        };

        const handleSubmit = async() => {
            const firstContragent = {
                data: firstAgent, 
                isPerson: firstFilters.includes('People'), 
                isCompany: firstFilters.includes('Company'),
                okved: firstOkved,
                regions: firstRegions
            }
            const secondContragent = {
                data: secondAgent, 
                isPerson: secondFilters.includes('People'), 
                isCompany: secondFilters.includes('Company'),
                okved: secondOkved,
                regions: secondRegions
            }

            const header : FindRelationshipType = {
                firstContragent: firstContragent, 
                secondContragent: secondContragent
            };

            const response = findRelationship(header); 
            response.then(response => {
                    setNodes(response.data.nodes)
                    setEdges(response.data.edges)
                })
                .catch(err => {
                    notification.error({message: 'Связи не найдены'})
                });
        };

        const onChangeFirstCheckboxes = (checkedValues: CheckboxValueType[]) => {
            setFirstFilters(checkedValues);
        };
        
        const onChangeSecondCheckboxes = (checkedValues: CheckboxValueType[]) => {
            setSecondFilters(checkedValues);
        };

        const onEnterKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
                setIsFirstSelectOpen(false);
                setIsSecondSelectOpen(false);
            }
        }        

        const onFirstFieldFocus = () => {
            const isOpen = secondAgent.length > 2;
            setIsFirstSelectOpen(isOpen)                    
            // if(firstAgent.length > 2){
            // }
        }

        const onFirstFieldBlur = () => {
            setIsFirstSelectOpen(false)
        }

        const onSecondFieldFocus = () => {
            const isOpen = secondAgent.length > 2;
            setIsSecondSelectOpen(isOpen);
            
        }

        const onSecondFieldBlur = () => {
            setIsSecondSelectOpen(false)
        }

        const onFirstFieldChange = (value: string) => {
            setFirstAgent(value);
        }

        const onSecondFieldChange = (value: string) => {
            setSecondAgent(value);
        }

        return (
            <Form
                name="form_item_path"
                layout="vertical"
                onFinish={handleSubmit}              
            >
                    <div className='flex justify-between'>
                        <MyFormItemGroup prefix={["user"]}> 
                            <MyFormItemGroup prefix={["name"]}
                            
                            >
                                <MyFormItem                                    
                                    name="firstAgent"
                                    label="Введите первого контрагента"                                    
                                >
                                    <Form.Item name={['firstContragent']} rules={[{ required: true, message: 'Введите имя контрагента' }]}>
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
                                        >
                                            {firstCoincidenceList && firstCoincidenceList.map((opt) => (
                                                <Select.Option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </Select.Option>))}
                                        </Select>
                                    </Form.Item>
                                    
                                    <InputFirstFilters />
                                        <Checkbox.Group 
                                            options={flagsOptions} 
                                            defaultValue={firstFilters} 
                                            style={{userSelect: 'none'}} 
                                            onChange={onChangeFirstCheckboxes}/>
                                </MyFormItem>
                                <MyFormItem
                                    name="secondAgent"
                                    label="Введите второго контрагента"
                                >
                                    <Form.Item name={['secondContragent']}>
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
                                        >
                                            {secondCoincidenceList && secondCoincidenceList.map((opt) => (
                                                <Select.Option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </Select.Option>))}
                                        </Select>
                                    </Form.Item>
                                    
                                    <InputSecondFilters />
                                        <Checkbox.Group 
                                            style={{userSelect: 'none'}}
                                            options={flagsOptions}
                                            defaultValue={secondFilters} 
                                            onChange={onChangeSecondCheckboxes} />
                                </MyFormItem>
                            </MyFormItemGroup>
                        </MyFormItemGroup>
                    </div>
                <Button
                    type="primary"
                    htmlType="submit"
                    className=" bg-blue-600 ml-auto"
                    style={{width: '140px', display: 'block'}}
                >
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                        <div >Найти</div> <SearchOutlined style={{margin: 'auto 0'}}/>

                    </div>
                </Button>
            </Form>
        );
    }
);

function findUniq(coincidences: ConvertedCoincidencesType[]): ConvertedCoincidencesType[] {
    const seen : {[key: string] : number} = {};
    const out = [];
    const j = 0;
    for(let i = 0; i < coincidences.length; i++) {
         const item = coincidences[i];
         if(seen[item.label] !== 1) {
               seen[item.label] = 1;
               const uniqueItem : ConvertedCoincidencesType = {label: item.label, value: item.value} 
               out.push(uniqueItem);
         }
    }
    return out;
}

export { InputKonterAgent };
