'use client'
import "./globals.css";
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import { handleParsePathParams, handleFormattedTableData, handleRemoveFirstDotAndBefore } from "@/utils/methodSet"
const { Header, Footer } = Layout;
export default function RootLayout({ children }) {
  const router = useRouter();
  const firstPathParam = handleParsePathParams()?.[0];


  const renderContent = () => {
    if (!firstPathParam) {
      // 如果firstPathParam不存在，则渲染Layout组件  
      return (
        <Layout>
          <Header className='flex items-center'>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['']}
              items={[
                { key: '', label: '首页' },
                { key: 'list', label: '列表' },
                { key: 'info', label: '关于我们' }
              ]}
              className='flex-1 min-w-0'
              onClick={(e) => router.push(`/${e?.key}`)}
            />
          </Header>
          {children}
          <Footer className='text-center'>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      );
    }
    if (firstPathParam.includes('signUp') || firstPathParam.includes('signIn')) {
      return children;
    }
  };

  return (
    <html lang="en">
      <body className="min-h-screen ">
        {renderContent()}
      </body>
    </html>
  );
}
