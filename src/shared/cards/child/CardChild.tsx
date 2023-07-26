import { memo, useState } from "react";
import { Button, Card, Modal, Typography } from "antd";
import { CompassOutlined, PhoneOutlined, BranchesOutlined } from "@ant-design/icons";
import { CardChildPropsType } from "./types";
import { Handle, Position } from "reactflow";

const CardChild = memo<CardChildPropsType>(function CardChild({
    data
}) {
    const {inn,
        dataReg, 
        okved, 
        profit,
        revenue,
        region} = data.info;

    const [isModal, setIsModal] = useState(false);

    const handleCardClick = () => {
        setIsModal(true);
    }

    const handleOnClose = () => {
        setIsModal(false);
    }

    return (
        <>
            {<Card            
                title={data.title}
                extra={<BranchesOutlined style={{color: 'white'}}/>}
                className=""
                onClick={handleCardClick}
                style={{background: '#2dc7cc', color: 'white', fontSize: 'large', minHeight: '150px', cursor: 'pointer'}}
                headStyle={{background: '#2dc7cc', color: 'white', fontSize: 'x-large'}}>
                    <Handle type='source' position={Position.Left} style={{visibility: 'hidden'}}/>
                    <Typography.Paragraph style={{color: 'white', fontSize: 'large'}}>{`${inn}`}</Typography.Paragraph>
                    <Handle type='target' position={Position.Bottom} style={{visibility: 'hidden'}}/>
            </Card>}
            <Modal 
                open={isModal} 
                onOk={handleOnClose} 
                onCancel={handleOnClose} 
                title={'Информация о компании'}
                footer={[<Button className={'modal-btn'} 
                onClick={handleOnClose} 
                type="primary" 
                style={{background: '#4096ff'}}>Ок</Button>]}>
                <p><b>Название компании:</b> {data.title}</p>
                <p><b>Регион: </b> {region}</p>
                <p><b>Сфера деятельности: </b> {okved}</p>
                <p><b>Прибыль: </b> {profit}</p>
                <p><b>Доход: </b> {revenue}</p>
                <p><b>ИНН: </b>{inn}</p>
                <p><b>Дата регистрации: </b>{dataReg}</p>
            </Modal>         
        </>
    );
});

export { CardChild };
