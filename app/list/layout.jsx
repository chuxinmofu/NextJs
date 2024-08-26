
'use client'
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation'
import { menuList } from '@/utils/menu'
const { Content, Sider } = Layout;
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
              defaultSelectedKeys={['app']}
              defaultOpenKeys={['sub1']}
              className='h-full'
              items={menuList}
              onClick={(e) => {
                router.push(`/list/${e?.key}`)
              }}
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
