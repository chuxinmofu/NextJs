
'use client'
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation'
const { Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
export default function ListLayout({ children }) {
  const router = useRouter();
  return (
    <div>
      <Content className='py-0 px-[48px]'>
        <Breadcrumb
          className='my-[24px] mx-0'
          items={[
            {
              title: 'Home',
            },
            {
              title: <a href="">Application Center</a>,
            },
            {
              title: 'An Application',
            },
          ]} />
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              className='h-full'
              items={items2}
              onClick={(e) => router.push(`/list/${e?.key}`)}
            />
          </Sider>
          <Content className='py-0 px-[24[x] min-h-[280px]' >
            {children}
          </Content>
        </Layout>
      </Content>

    </div>
  );
}
