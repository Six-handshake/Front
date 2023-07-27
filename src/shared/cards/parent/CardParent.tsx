import { memo, useState } from "react";
import { Button, Card, Typography } from "antd";
import { CardParentPropsType } from "./types";
import { Handle, Position } from "reactflow";
import { IdcardOutlined } from "@ant-design/icons";
import {Modal} from "antd";

const CardParent = memo<CardParentPropsType>(function CardParent({
    data
}) {
    const [isModal, setIsModal] = useState(false);
    const isCompany = data.info.profit !== undefined; 

    const handleCardClick = () => {
        setIsModal(true);
    }

    const handleOnClose = () => {
        setIsModal(false);
    }

    return (
        <>
            <Card
                onClick={handleCardClick}
                size={'small'}
                className=""
                style={{background: '#E0A219', cursor: 'pointer'}}            
                >
                <Handle type='target' position={Position.Right} style={{visibility: 'hidden'}}/>
                <div className="text-white flex gap-2 flex-row items-center">
                    <IdcardOutlined className="text-white " style={{fontSize: '32px'}}/>
                    {/* <Typography.Paragraph style={{fontSize: 'x-large', color: 'white', margin: 'auto'}}>{`${data.title} x${data.x} y${data.y} id${data.id}`}</Typography.Paragraph> */}
                    <Typography.Paragraph style={{fontSize: 'large', color: 'white', margin: 'auto 0'}}>{`${data.title}`}</Typography.Paragraph>
                </div>
                <Handle type='source' position={Position.Left} style={{visibility: 'hidden'}}/>
            </Card>
            {isCompany 
                ? 
                <Modal 
                    open={isModal} 
                    onOk={handleOnClose} 
                    onCancel={handleOnClose} 
                    title={'Информация о компании'}
                    footer={[<Button className={'modal-btn'} onClick={handleOnClose} type="primary" style={{background: '#4096ff'}}>Ок</Button>]}>
                    <p><b>Название компании:</b> {data.title}</p>
                    <p><b>Регион: </b> {data.info.region}</p>
                    <p><b>Сфера деятельности: </b> {data.info.okved}</p>
                    <p><b>Прибыль: </b> {data.info.profit}</p>
                    <p><b>Доход: </b> {data.info.revenue}</p>
                    <p><b>ИНН: </b>{data.info.inn}</p>
                    <p><b>Дата регистрации: </b>{data.info.dataReg}</p>
                </Modal> 
                :
                <Modal 
                    open={isModal} 
                    onOk={handleOnClose} 
                    onCancel={handleOnClose} 
                    title={'Информация о физическом лице'}
                    footer={[<Button className={'modal-btn'} 
                    onClick={handleOnClose} 
                    type="primary" 
                    style={{background: '#4096ff'}}>Ок</Button>]}>
                        <p><b>ФИО: </b> {data.title}</p>
                        <p><b>ИНН: </b>{data.info.inn}</p>
                </Modal>}
        
        </>
    );
});

export { CardParent };
