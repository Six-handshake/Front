import { memo, useState } from "react";
import { Card, Typography } from "antd";
import { CompassOutlined, PhoneOutlined, BranchesOutlined } from "@ant-design/icons";
import { CardChildPropsType } from "./types";
import { Handle, Position } from "reactflow";

const CardChild = memo<CardChildPropsType>(function CardChild({
    data
}) {
    const [isSwitched, setIsSwitched] = useState(false);

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsSwitched(prev => !prev)
    }

    return (
        <>
            {isSwitched ? <SwitchedCard data={{
                companyName: data.companyName,
                id: data.id,
                adress: data.adress,
                description: data.description,
                phone: data.phone,
                handleCardClick: handleCardClick
            }} /> : <Card            
                title={data.companyName}
                extra={<BranchesOutlined style={{color: 'white'}}/>}
                className=""
                onClick={handleCardClick}
                style={{background: 'grey', color: 'white', fontSize: 'large', minHeight: '150px', cursor: 'pointer'}}
                headStyle={{background: 'grey', color: 'white', fontSize: 'x-large'}}>
                <Handle type='source' position={Position.Left}/>
                    <Typography.Paragraph style={{color: 'white', fontSize: 'large'}}>{`${data.description}`}</Typography.Paragraph>
                    <Handle type='target' position={Position.Bottom}/>
            </Card>}
        
        </>
    );
});

const SwitchedCard = ({data} : CardChildPropsType) => {
   return (
    <Card            
    title={data.companyName}
    extra={<BranchesOutlined style={{color: 'white'}}/>}
    className=""
    onClick={data.handleCardClick}
    style={{background: 'grey', color: 'white', fontSize: 'large', cursor: 'pointer'}}
    headStyle={{background: 'grey', color: 'white', fontSize: 'x-large', minHeight: '180px'}}>
        <Handle type='source' position={Position.Left}/>
            <Typography.Paragraph style={{color: 'white', fontSize: 'large'}}>{`${data.description}`}</Typography.Paragraph>
            {data.adress && <Typography.Paragraph>
                <CompassOutlined /> Адресс {data.adress}
            </Typography.Paragraph>}
            {data.phone && <Typography.Paragraph>
                <PhoneOutlined /> Телефон {data.phone}
            </Typography.Paragraph>}
            <Handle type='target' position={Position.Bottom}/>
    </Card>
   );
};
export default SwitchedCard 

export { CardChild };
