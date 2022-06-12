import { Button, Modal, Result } from 'antd';
import React, { useState } from 'react';

const ModalSucces = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Result
                    status="success"
                    title="Successfully Register"
                    subTitle="Please check your email and verify your account"
                    extra={[
                        <Button type="primary" key="console">
                            Go Console
                        </Button>,
                        <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Modal>
        </>
    );
};

export default ModalSucces;