import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Modal, Spin } from 'antd';
import styles from './index.less';


export default function Index() {
    const [appList, setAppList] = useState([]);
    const [loading, setLoad] = useState(false);
    const [fileReady, setFileHide] = useState(false);


    useEffect(() => {
        // TODO: 获取应用app list
    }, []);

    const onClick = () => {
        const reader = new FileReader();

        console.log('点击了生成', fs);
        setLoad(true);
        // TODO: 获取api.doc -> 读取文件 -> 存入内存
    }

    return <div className={styles.box}>
        <Row gutter={24}>
            <Col span={2} className={styles.title}>
                应用:
            </Col>
            <Col span={10} className={styles.input}>
                <Input placeholder="请输入应用名" allowClear />
            </Col>
            <Col span={4}>
                <Button type="primary" onClick={onClick} loading={loading}>{loading ? '生成中' : '生成'}</Button>
            </Col>
            <Col span={8}>

            </Col>
        </Row>
    </div>
}