import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Input, Button, Modal, Spin, Tag, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';;
import styles from './index.less';


export default function Index() {
    const [appList, setAppList] = useState([]);
    const [loading, setLoad] = useState(false);
    const [fileReady, setFileHide] = useState(false);
    const [downData, setDownData] = useState(null);


    useEffect(() => {
        // TODO: 获取应用app list
    }, []);

    const onClick = () => {
        const res = axios.get('http://localhost:3000/getTemplate');

        setLoad(true);

        setTimeout(() => {
            res.then(({ data: { data, success } }) => {
                if (success) {
                    setLoad(false);
                    setFileHide(true)
                    setDownData(data);
                }
            });
        }, 3000);


        // TODO: 获取api.doc -> 读取文件 -> 存入内存
    }

    const downFile = () => {
        
        let blob = new Blob([downData], {
            type: 'text/plain'
        });

        console.log('点击了下载', downData, blob);

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'server.js';
        link.click();
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
        {
            fileReady ? <div className={styles.fileCss}>
                <span>文件<Popover content="点击文件进行下载"><QuestionCircleOutlined /></Popover>:</span><Tag color="success" className={styles.tag}  onClick={downFile}>server.js</Tag>
            </div> : null
        }
    </div>
}