import React, { memo, useState } from "react";
import { Form, Button, Checkbox, FormItemProps, Select, SelectProps, notification } from "antd";
import { InputKonterAgentPropsType, MyFormItemGroupPropsType, ConvertedCoincidencesType } from "./types";
import { findRelationship, findCoincidence, FindRelationshipType, FindCoincidenceType, FindCoincindeceRequestType } from "../../api";

import { CheckboxValueType } from "antd/es/checkbox/Group";
import { InputFirstFilters, InputSecondFilters } from "../inputFilters";
import { BankOutlined, LoadingOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import useStore from "../../store/useStore";

const MyFormItemContext = React.createContext<(string | number)[]>([]);
const flagsOptions = [
    { label: ``, value: 'Company' },
    { label: '', value: 'People' },
    // { label: 'компании', value: 'Company' },
    // { label: 'люди', value: 'People' },

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

    return <Form.Item className="w-1/3"  name={concatName} {...props} />;
};

const InputKonterAgent = memo<InputKonterAgentPropsType>(
    function InputKonterAgent({ ...props }) {
        const setNodes = useStore((state) => state.setNodes);
        const setEdges = useStore((state) => state.setEdges);

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

        const switchLoading = useStore((state) => state.switchIsLoading);
        const isLoading = useStore((state) => state.isLoading)

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

        const handleSubmit = async () => {
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

            const header: FindRelationshipType = {
                firstContragent: firstContragent,
                secondContragent: secondContragent,
            };

            const response = findRelationship(header);
            switchLoading();
            response
                .then((response) => {
                    setNodes(response.data.nodes);
                    setEdges(response.data.edges);
                })
                .catch((err) => {
                    notification.error({ message: "Связи не найдены" });
                    
                })
                .finally(() => switchLoading());

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
            if(value === undefined){
                setFirstAgent('')
            }
            else{
                setFirstAgent(value);
            }
        };

        const onSecondFieldChange = (value: string) => {
            if(value === undefined){
                setSecondAgent('')
            }
            else{
                setSecondAgent(value);
            }
        };

        return (
            <Form
                name="form_item_path"
                layout="vertical"
                onFinish={handleSubmit}
            >
                    <div className='flex justify-betweeen' style={{alignItems: 'middle'}}>
                        <MyFormItemGroup prefix={["user"]}> 
                            <MyFormItemGroup prefix={["name"]}>
                                <MyFormItem name="firstAgent">
                                    <div style={{marginBottom: '15px', textAlign: 'center', marginRight: '65px'}}>Введите первого контрагента</div>
                                    <div style={{display: 'flex'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', width: '700px'}}>
                                            <Form.Item name={['firstContragent']} rules={[{ required: true, message: 'Введите имя контрагента' }]}>
                                                <Select
                                                    allowClear
                                                    style={{maxWidth: '370px'}}
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
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', margin: 'auto 15px'}} >
                                            <Checkbox.Group                
                                                defaultValue={firstFilters} 
                                                style={{userSelect: 'none', height: '150px'}} 
                                                onChange={onChangeFirstCheckboxes}                                                
                                                >
                                                    <div style={{margin: 'auto', display: 'flex', gap: '10px'}}>
                                                        <Checkbox value={'Company'}></Checkbox><BankOutlined  style={{fontSize: '40px'}}/>
                                                    </div>
                                                    <div style={{margin: 'auto', display: 'flex', gap: '10px'}}>
                                                        <Checkbox value={'People'} style={{margin: 'auto'}}></Checkbox>
                                                        <UserOutlined style={{fontSize: '40px'}}/>
                                                    </div>
                                            </Checkbox.Group>
                                        </div>
                                    </div>
                                </MyFormItem>
                                {<Button
                                    type="primary"
                                    htmlType="submit"
                                    className="  ml-auto"
                                    style={{width: '140px', display: 'block', margin: 'auto', height: '140px', borderRadius: '50%', background: '#094B73'}}
                                >
                                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px', flexDirection: 'column'}}>
                                        <div style={{fontSize: '20px'}}>Поиск</div> {isLoading 
                                        ? <LoadingOutlined style={{margin: 'auto', fontSize: '25px'}}/>
                                        : <SearchOutlined style={{margin: 'auto', fontSize: '25px'}}/>}
                                    </div>
                                </Button>}
                                <MyFormItem                                    
                                    name="secondAgent"
                                >
                                    <div style={{marginBottom: '15px', textAlign: 'center'}}>Введите второго контрагента</div>
                                    <div style={{display: 'flex'}}>
                                                <Checkbox.Group 
                                                    style={{userSelect: 'none',}}
                                                    defaultValue={secondFilters} 
                                                    onChange={onChangeSecondCheckboxes}>
                                                        <div style={{margin: 'auto 0', display: 'flex', gap: '10px'}}>
                                                            <BankOutlined style={{fontSize: '40px'}}/><Checkbox value={'Company'}></Checkbox>
                                                        </div>
                                                        <div style={{margin: 'auto 0', display: 'flex', gap: '10px'}}>
                                                            <UserOutlined style={{fontSize: '40px'}}/><Checkbox value={'People'}></Checkbox>
                                                        </div>                                                    
                                                </Checkbox.Group>
                                        <div style={{display: 'flex', flexDirection: 'column', width: '700px'}}>
                                            <Form.Item name={['secondContragent']}>
                                                <Select 
                                                    allowClear                                            
                                                    style={{maxWidth: '370px'}}
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
                                        </div>
                                    </div>
                                </MyFormItem>
                            </MyFormItemGroup>
                        </MyFormItemGroup>
                    </div>                
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
