import React from 'react';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  RadarChartOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import DataGrab from '../modules/dataGrab/index';

const { Header, Sider, Content } = Layout;

import styles from './index.less';

export default function Index() {
  const [collapsed, setCollapsed] = useState(0);

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<RadarChartOutlined />}>
            apiDoc数据自动抓取
        </Menu.Item>
          {/* <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
        </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
        </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles.trigger,
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className={styles.contentBackground}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <DataGrab />
      </Content>
      </Layout>
    </Layout>
  );
}
