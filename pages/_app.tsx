import React, { useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import Link from 'next/link';


import { Layout, Menu} from 'antd';
import {
    UploadOutlined,
    TableOutlined
  } from '@ant-design/icons';


  const { Sider } = Layout;

function MyApp({Component, pageProps}:AppProps) {
  const [Collaped, setCollaped] = useState(false)

  const onCollapse = (collapsed: any) => {
    console.log(collapsed);
    setCollaped(collapsed!)
  };
    return (
      <Layout  style={{ minHeight: '100vh'}}>
        <Sider collapsible collapsed={Collaped} onCollapse={onCollapse}>
          <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<UploadOutlined />}>
                <Link href="../">import file</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<TableOutlined />}>
                <Link href="../salary">salary</Link>
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Component {...pageProps} />
        </Layout>
      </Layout>
      
    );
  }
  




export default MyApp

