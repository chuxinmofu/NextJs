'use client'
import "./globals.css";
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation'
const { Header, Footer } = Layout;
export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <html lang="en">
      <body className="min-h-screen ">
        <Layout>
          <Header className='flex items-center' >
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['']}
              items={[{
                key: '',
                label: '首页',
              },
              {
                key: 'list',
                label: '列表'
              },
              {
                key: 'info',
                label: '关于我们'
              }
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

      </body>
    </html>
  );
}
